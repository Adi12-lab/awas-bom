"use client"
import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { useAskHelp, useResults } from "@/hooks/menuStore"

import { generateRandomNumber } from "@/helpers"
import statements from "@/data/statements"

type Statement = {
    statement: string,
    isTrue: boolean
}

export default function ModalQuestion() {
    const { askHelp, changeAskHelp } = useAskHelp()
    const { results } = useResults()
    const [progress, setProgress] = useState(100);
    const [statement, setStatement] = useState<Statement>(statements[0])
    const countdownDuration = 50;

    const [answer, setAnswer] = useState<boolean | null>(null)

    const bar = useRef<HTMLDivElement>(null)
    let interval = useRef<ReturnType<typeof setInterval>>();


    useEffect(() => {
        const indexRandom = generateRandomNumber(0, statements.length - 1)
        setStatement(statements[indexRandom])


        if ((askHelp.ask && askHelp.active) && progress > 0) {
            interval.current = setInterval(() => {
                setProgress((prevProgress) => prevProgress - 100 / countdownDuration);
            }, 1000);

            return () => clearInterval(interval.current)
        } else if (results.isFinish) {
            clearInterval(interval.current)
            setProgress(100)
        }


    }, [askHelp, results]);


    useEffect(() => {
        gsap.to(bar.current, {
            scaleX: progress / 100,
            duration: 0.5, // Durasi animasi
            ease: 'power1.out', // Efek easing
        });
        if (progress === 0) {
            changeAskHelp({
                ask: true,
                active: false,
                isCorrect: false
            })
        }
    }, [progress])

    useEffect(() => {
        if (answer === statement.isTrue) {
            console.log("benar")
            changeAskHelp({//nonaktifkan sementara
                ask: true,
                active: false,
                isCorrect: true,
            })
        } else if (answer !== statement.isTrue && answer !== null) { //jawaban sudah ada tapi bernilai salah
            
            console.log("salah")
            changeAskHelp({
                ask: true,
                active: false,
                isCorrect: false,
            })
        }
    }, [answer])




    return (
        <div className={`${askHelp.ask && askHelp.active ? "animate-left" : "hidden"} absolute top-1/2 left-0 -translate-y-1/2 z-[800]`}>
            <div className="text-white w-full py-4 flex flex-col items-center bg-purple-950 ">
                <div className="h-1 w-full bg-yellow-600 origin-left" ref={bar}></div>
                <h3 className="text-center font-sigmar text-3xl tracking-[10px]">
                    Pertanyaan Bonus
                </h3>

                <p className="text-center  font-comic text-lg w-2/3 mt-3">
                    {statement?.statement}
                </p>
                <div className="mt-4">
                    <button className="bg-red-500 px-4 py-3 font-sigmar text-xl rounded-lg"
                        type="button"
                        onClick={() => setAnswer(false)}>
                        Salah
                    </button>
                    <button className="bg-green-500 px-4 py-3 font-sigmar text-xl ms-5 rounded-lg"
                        type="button"
                        onClick={() => setAnswer(true)}>
                        Benar
                    </button>
                </div>

            </div>
        </div>
    )
}
