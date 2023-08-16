"use client"
import { useEffect, useRef, useState } from "react"

import { useStartStore, useSettingsStore, useResults, useAskHelp } from "@/hooks/menuStore"
import Tnt from "@/public/image/tnt2.png"
import Image from "next/image"

export default function Timer() {
    const { settings } = useSettingsStore()
    const { askHelp } = useAskHelp()

    const [seconds, setSeconds] = useState(settings.seconds)
    const [minutes, setMinutes] = useState(settings.minutes)
    const [isPaused, setIsPaused] = useState(false);

    let timer = useRef<ReturnType<typeof setInterval>>();
    const { start } = useStartStore()
    const { results, changeResults } = useResults()

    useEffect(() => {
        if (start === "start" && !isPaused) {
            timer.current = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 0) {
                        if (minutes > 0) {
                            setMinutes(prevMinutes => prevMinutes - 1);
                            return 59;
                        } else {
                            clearInterval(timer.current);
                            changeResults({
                                isFinish: true,
                                result: "lose"
                            });
                            return 0;
                        }
                    } else {
                        return prevSeconds - 1;
                    }
                });
            }, 1000);

            return () => clearInterval(timer.current);

        } else {
            clearInterval(timer.current);
        }
    }, [start, isPaused, minutes, changeResults]);

    useEffect(() => {
        if (results.isFinish) clearInterval(timer.current);
    }, [results]);

    useEffect(() => {
        setMinutes(settings.minutes);
        setSeconds(settings.seconds);
    }, [settings]);

    useEffect(() => {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer.current);
            changeResults({
                isFinish: true,
                result: "lose"
            });
        }
    }, [minutes, seconds, changeResults]);

    useEffect(() => {
        setIsPaused(askHelp.active)
    }, [askHelp.active])

  

    return (
        <div className={`${start === "start" ? "" : "hidden"} flex items-center relative text-white`}>
            <h2 className="font-sigmar text-4xl absolute z-40 right-[37px] top-[84px]">{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</h2>
            <Image src={Tnt} alt="tnt" className="-rotate-90" width={240} height={240} />
        </div>


    )
}
