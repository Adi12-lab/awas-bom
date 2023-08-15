"use client"
import { useState, useEffect } from "react"
import { generateUniqueRandomNumbers, generateArrayNumber, countBoolean } from "@/helpers";
import { useStartStore, useSettingsStore, useResults, useShowBombs } from "@/hooks/menuStore";

import Question from "@/public/image/question.png"
import Image from "next/image";
import Bomb from "@/public/image/bomb.png"
import Checklist from "@/public/image/icons8-check-96.png"

export default function Area() {
    const { settings } = useSettingsStore()
    const { start } = useStartStore() //Bermain atau tidak
    const { results, changeResults } = useResults()
    const { isShow } = useShowBombs()


    const [blocks, setblocks] = useState<number[]>(generateArrayNumber(9))
    const [guesses, setGuesses] = useState(Array(blocks.length).fill(false));
    const [flipped, setFlipped] = useState(Array(blocks.length).fill(false));
    const [bombList, setBombList] = useState<number[]>([]);

    const checkInput = (num: number, index: number) => {
        console.log(bombList)
        const result = bombList.find((bomb) => (bomb == num))
        const newGuesses = [...guesses];
        const newFlipped = [...flipped];


        newFlipped[index] = true;
        if (result === undefined) {
            newGuesses[index] = true; //tebakan benar tapi belum tentu menang
        } else {// tebakan salah
            newGuesses[index] = false;

            changeResults({
                isFinish: true,
                result: "lose"
            })
        }


        setGuesses(newGuesses);
        setFlipped(newFlipped)
    }

    useEffect(() => {
        const bombs = generateUniqueRandomNumbers(settings.bomb, 1, blocks.length);
        setBombList(bombs);
        setblocks(generateArrayNumber(settings.block))
    }, [settings, blocks.length])



    useEffect(() => {
        if (countBoolean(guesses, true) === (blocks.length - bombList.length)) {//mengecek apakah bom sudah terpilih atau tidak

            changeResults({
                isFinish: true,
                result: "win"
            })
        }

    }, [guesses, blocks, bombList, changeResults])

    return (
        <>
            <section className={`${start === "start" ? "" : "hidden"} text-white`}>

                <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px]  grid grid-cols-3 gap-8">
                    {
                        blocks.map((item, index) => {
                            return (
                                <button type="button" className={`flipper `} key={item} disabled={results.isFinish} onClick={() => checkInput(item, index)}>
                                    <div className={`flipper-card ${flipped[index] || isShow ? "flipped" : ''}`}>
                                        <div className="flipper-front">
                                            <Image src={Question} alt="question" className="w-[70px] md:w-fit" />
                                        </div>
                                        <div className="flipper-back">
                                            {guesses[index] || (isShow && bombList.find((bomb) => (bomb == item)) === undefined) ? (
                                                <Image src={Checklist} alt="checklist" />
                                            ) : (
                                                <Image src={Bomb} alt="bomb" />
                                            )}
                                        </div>
                                    </div>
                                </button>
                            )
                        })
                    }
                </div>
            </section>

        </>
    )
}
