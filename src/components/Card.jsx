import React from 'react'
import useScreenShare from '../hooks/useScreenShare'
import { Link } from 'react-router-dom'

const Card = () => {
    const isSupported =navigator.mediaDevices.getDisplayMedia;


    return (
        <>
            <div
                className="bg-white shadow-sm border border-gray-200 p-2 w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                <div className="p-4 text-center">
                    <h3 className="text-xl font-bold capitalize"> Screen Share Test App</h3>
                    <p className="mt-3 text-sm text-slate-500 leading-relaxed capitalize">Verify your browser screen sharing capabilities and permissions with a quick local stream test.</p>
                    {
                        !isSupported ? (
                            <>
                                <p className="text-red-400">
                                    Your browser does not support screen sharing.
                                </p>
                            </>
                        ) : (<>
                            <Link to={`/screen-test`}
                                className="capitalize px-4 mt-11 py-2.5 w-full rounded-lg text-white text-sm tracking-wider font-medium border-none outline-none bg-blue-600 hover:bg-blue-700 cursor-pointer"> Start Screen Test
                            </Link>

                        </>
                        )
                    }

                </div >
            </div >
        </>
    )
}

export default Card
