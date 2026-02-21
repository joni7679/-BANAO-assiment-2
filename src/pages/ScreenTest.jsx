
import React, { useEffect, useRef } from 'react'
import useScreenShare from '../hooks/useScreenShare'
import { Link } from 'react-router-dom'

const ScreenTest = () => {
    const videoRef = useRef()
    const {
        startScreen,
        stopScreen,
        status,
        error,
        metadata,
        stream,
    } = useScreenShare()
    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <>
            <section className='w-full min-h-screen bg-gray-900 flex items-center justify-center flex-col'>
                {
                    status === "idle" &&
                    <button onClick={startScreen} className='px-4 py-2 rounded-2xl bg-blue-700 text-white cursor-pointer hover:bg-blue-800 duration-300'>Share Screen</button>
                }
                {
                    status === "requesting" &&
                    <p className='text-center font-semibold capitalize text-yellow-500'>requesting...</p>
                }
                {
                    status === "cancelled" &&
                    <p className='text-center font-semibold capitalize text-blue-500'>user cancelled sharing.</p>
                }
                {
                    status === "unsupported" &&
                    <p className='text-center font-semibold capitalize text-red-500'>screen sharing not supported.</p>
                }
                {status === "denied" && (
                    <p className="text-red-400">Permission Denied</p>
                )}
                {
                    status === "error" &&
                    <p className='text-center font-semibold capitalize text-red-500'>error</p>
                }
                {status === "active" && (
                    <>
                        <div className="w-full max-w-3xl mt-4">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full rounded-lg"
                            />
                        </div>

                        <div className="mt-4">
                            <p>Resolution: {metadata?.width} x {metadata?.height}</p>
                            <p>FrameRate: {metadata?.frameRate}</p>
                            <p>Surface: {metadata?.displaySurface}</p>
                            <p className="text-green-400">Screen stream active</p>
                        </div>

                        <button
                            onClick={stopScreen}
                            className="mt-4 px-4 py-2 bg-red-600 rounded text-white"
                        >
                            Stop Sharing
                        </button>
                    </>
                )}
                {status === "stopped" && (
                    <>


                        <button
                            onClick={startScreen}
                            className="mt-4 px-4 py-2 text-white bg-blue-600 rounded"
                        >
                            Share screen
                        </button>

                        <Link
                            to={`/`}
                           
                            className="mt-4 px-4 py-2 text-white bg-blue-600 rounded"
                        >
                        Back To Home
                        </Link>
                    </>
                )}
            </section>

        </>
    )
}

export default ScreenTest
