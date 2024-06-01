'use client'
import React, { useEffect, useState } from 'react'
import anime from 'animejs'
import Image from 'next/image'
import Logo from '../../public/next.svg';


export default function SplashScreen({ finishLoading }) {
    const [isMounted, setIsMounted] = useState(false)
    const animate = () => {
        const loader = anime.timeline({
            complete: () => finishLoading()
        })
        loader.add({
            targets: "#logo",
            delay: 0,
            scale: 2,
            duration: 2000,
            easing: "easeInOutExpo",

        })
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsMounted(true)
        }, 10)
        animate()
        return () => clearTimeout(timeout)

    }, [])

    return (
        <div className='flex h-screen items-center justify-center bg-dark overflow-hidden '>
            {/* <img id="logo" src={Logo} alt="animation" width={60} /> */}
            <div id="logo" className='d-flex flex-column align-items-center justify-content-center bg-dark text-white vh-100'>
                <div>
                    <h1>Welcome</h1>
                </div>
                <div>
                    <h3>Restaurant Management System</h3>
                </div>
            </div>
        </div>
    )
}
