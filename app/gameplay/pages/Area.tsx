"use client"
import { useState, useEffect } from "react"
import { generateUniqueRandomNumbers, generateArrayNumber } from "@/helpers";
import { useStartStore, useSettingsStore } from "@/hooks/menuStore";
import ModalResult from "@/components/modal-result";

import Question from "@/public/image/question.png"
import Image from "next/image";
import Bomb from "@/public/image/bomb.png"
import Checklist from "@/public/image/icons8-check-96.png"

export default function Area() {
    const [isWin, setIsWin] = useState(false)
    const { settings } = useSettingsStore()
    const { start, changeStart } = useStartStore() //Bermain atau tidak
    const [openModalResult, setOpenModalResult] = useState(false) //dinyalakan atau tidak
    const [isFinish, setIsFinish] = useState(false)

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
        if(result === undefined) {
            newGuesses[index] = true; //tebakan benar
        } else {// tebakan salah
            newGuesses[index] = false;
            setOpenModalResult(true);
            setIsFinish(true)
        }


        setGuesses(newGuesses);
        setFlipped(newFlipped)
    }

    useEffect(() => {
        const bombs = generateUniqueRandomNumbers(settings.bomb, 1, blocks.length);
        setBombList(bombs);
        setblocks(generateArrayNumber(settings.block))

        if (isWin) {
            setIsWin(false)
            changeStart(false)
            setOpenModalResult(true)
        }
    }, [isWin, changeStart, settings, blocks.length])

    return (
        <>
            <section className={`${start ? "" : "hidden"} h-screen flex items-center justify-center`}>

                <div className="w-[600px] h-[600px] grid grid-cols-4 gap-8">
                    {
                        blocks.map((item, index) => {
                            return (
                                <button type="button" className={`flipper`} key={item} disabled={isFinish} onClick={() => checkInput(item, index)}>
                                    <div className={`flipper-card ${flipped[index] ? "flipped" : ''}`}>
                                        <div className="flipper-front">
                                            <Image src={Question} alt="question" />
                                        </div>
                                        <div className="flipper-back">
                                            {guesses[index] ? (
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
                <ModalResult isWin={isWin} active={openModalResult} />
        </>
    )
}
