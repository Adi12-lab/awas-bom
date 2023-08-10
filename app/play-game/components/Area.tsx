"use client"
import { useState, useEffect } from "react"
import { generateUniqueRandomNumbers } from "@/helpers";
import { useMenuStore, useSettingsStore } from "@/hooks/menuStore";
import { useRouter } from "next/navigation";
export default function Area() {
    const router = useRouter()
    const [win, setWin] = useState(false)
    const { menu, changeMenu } = useMenuStore()
    const initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const bombs = generateUniqueRandomNumbers(3, 1, initialData.length)

    if (menu !== "play-game") {
        router.push("/");
    }

    const checkInput = (num: number) => {
        console.log(bombs)
        const result = bombs.find((bomb) => (bomb == num))
        console.log(result)
        if (result) setWin(true)
    }

    useEffect(() => {

        if (win) {
            setWin(false)
            changeMenu("menu")
        }
    }, [win, changeMenu])

    return (
        <section className="flex-1 h-screen flex items-center justify-center bg-slate-400">
            <div className="w-[600px] h-[600px] grid grid-cols-3 gap-8">
                {
                    initialData.map((item) => {
                        return (
                            <div key={item} className="border-2 border-orange-200 flex items-center justify-center">
                                <button type="button" onClick={() => checkInput(item)}>
                                    ?
                                </button>
                            </div>
                        )
                    })
                }

            </div>
        </section>
    )
}
