"use client"
import { useEffect, useRef, useState } from "react"

import { useStartStore, useSettingsStore, useResults } from "@/hooks/menuStore"
import Tnt from "@/public/image/tnt2.png"
import Image from "next/image"

export default function Timer() {
    const { settings } = useSettingsStore()

    const [seconds, setSeconds] = useState(settings.seconds)
    const [minutes, setMinutes] = useState(settings.minutes)

    let timer = useRef<ReturnType<typeof setInterval>>();
    const { start } = useStartStore() //memasuki play atau tidak
    const { results, changeResults} = useResults()

    useEffect(() => {
        if (start === "start") {
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

        } else {
            clearInterval(timer.current)

        }
    })

    useEffect(() => {

        if (results.isFinish) clearInterval(timer.current)
    }, [results])

    useEffect(() => {
        setMinutes(settings.minutes)
        setSeconds(settings.seconds)
    }, [settings])

    const restart = () => {

        setSeconds(0)
        setMinutes(0)

    }
    useEffect(() => {//kondisi kalah kehabisan waktu
        if ((minutes === 0 && seconds === 0)) {
            clearInterval(timer.current)
            changeResults({
                isFinish: true,
                result: "lose"
            })
        }
    }, [minutes, seconds, timer, changeResults])
    return (
        <div className={`${start === "start" ? "" : "hidden"} flex items-center relative text-white`}>
            <h2 className="font-sigmar text-4xl absolute z-40 right-[37px] top-[84px]">{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</h2>
            <Image src={Tnt} alt="tnt" className="-rotate-90" width={240} height={240} />
        </div>


    )
}
