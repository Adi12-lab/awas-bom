"use client"
import { useEffect, useRef, useState } from "react"
import Tnt from "@/public/image/tnt2.png"
import Image from "next/image"
export default function Timer() {
    const [seconds, setSeconds] = useState(20)
    const [minutes, setMinutes] = useState(0)

    let timer = useRef<ReturnType<typeof setInterval>>();

    useEffect(() => {
        timer.current = setInterval(() => {
            setSeconds(seconds - 1)
            if (seconds === 0) {
                if (minutes > 0) {
                    setMinutes(minutes - 1)
                }
                setSeconds(59)
            }
        }, 1000)

        return () => clearInterval(timer.current)
    })

    const restart = () => {

        setSeconds(0)
        setMinutes(0)

    }
    useEffect(() => {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer.current)
        }
    }, [minutes, seconds, timer])
    const stop = () => {
        clearInterval(timer.current)
    }
    return (
        <div className="flex items-center relative">
            <h2 className="font-sigmar text-4xl absolute z-40 right-[37px] top-[84px]">{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</h2>
            <Image src={Tnt} alt="tnt" className="-rotate-90" width={240} height={240} />
        </div>


    )
}
