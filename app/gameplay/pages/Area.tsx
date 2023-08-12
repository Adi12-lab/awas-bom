"use client"
import { useState, useEffect } from "react"
import { generateUniqueRandomNumbers } from "@/helpers";
import { useStartStore, useSettingsStore } from "@/hooks/menuStore";
import Question from "@/public/image/question.png"
import Image from "next/image";


export default function Area() {
    const [isLose, setIsLose] = useState(false)
    const {settings} = useSettingsStore()
    const { start, changeStart } = useStartStore()
    // const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    const bombs = generateUniqueRandomNumbers(settings.bomb, 1, initialData.length)

    
    const checkInput = (num: number) => {
        console.log(bombs)
        const result = bombs.find((bomb) => (bomb == num))
        console.log(result)
        if (result) setIsLose(true)
    }

    useEffect(() => {

        if (isLose) {
            setIsLose(false)
            changeStart(false)
        }
    }, [isLose, changeStart])

    return (
        <section className={`${start ? "" : "hidden"} h-screen flex items-center justify-center`}>
  
            <div className="w-[600px] h-[600px] grid grid-cols-4 gap-8">
                {
                    initialData.map((item) => {
                        return (
                            <div key={item} className="border-2 border-orange-200 flex items-center justify-center">
                                <button type="button" onClick={() => checkInput(item)}>
                                    <Image src={Question} alt="question"/>
                                </button>
                            </div>
                        )
                    })
                }

            </div>
        </section>
    )
}
