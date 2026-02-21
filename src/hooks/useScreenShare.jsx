import React, { useCallback, useEffect, useRef, useState } from 'react'

const useScreenShare = () => {
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);
    const [metadata, setmetaData] = useState(null)
    const streamRef = useRef(null);



    const stopScreen = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setStatus("stopped");
    }, []);

    const startScreen = useCallback(async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
            setStatus("unsupported");
            return;
        }
        stopScreen()
        try {
            setError(null);
            setmetaData(null);
            setStatus("requesting");
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { frameRate: { ideal: 30 } },
                audio: false
            })
            streamRef.current = stream;
            const track = stream.getVideoTracks()[0];
            const settings = track.getSettings();
            setmetaData({
                width: settings.width,
                height: settings.height,
                frameRate: settings.frameRate,
                displaySurface: settings.displaySurface || "unknown",
            });
            track.onended = () => {
                stopScreen();
            }
            setStatus("active");
        } catch (error) {
            if (error.name === "NotAllowedError") {
                setStatus("denied");
            } else if (error.name === "AbortError") {
                setStatus("cancelled");
            } else {
                setStatus("error");
                setError(error.message);
            }
        }
    }, [stopScreen])

    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
                streamRef.current = null;
            }
        };
    }, []);
    return {
        startScreen,
        stopScreen,
        status,
        error,
        metadata,
        stream: streamRef.current,
    }
}

export default useScreenShare
