"use client"
import { useState, useEffect } from "react"
import { generateUniqueRandomNumbers, generateArrayNumber, countBoolean } from "@/helpers";
import { useStartStore, useSettingsStore } from "@/hooks/menuStore";
import ModalResult from "@/components/modal-result";

import Question from "@/public/image/question.png"
import Image from "next/image";
import Bomb from "@/public/image/bomb.png"
import Checklist from "@/public/image/icons8-check-96.png"
import Timer from "@/components/timer";

export default function Area() {
    const { settings } = useSettingsStore()
    const { start, changeStart } = useStartStore() //Bermain atau tidak

    const [isWin, setIsWin] = useState(false)
    const [openModalResult, setOpenModalResult] = useState(false) //dinyalakan atau tidak
    const [isFinish, setIsFinish] = useState(false)
    const [counter, setCounter] = useState(0)

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
            newGuesses[index] = true; //tebakan benar
        } else {// tebakan salah
            newGuesses[index] = false;
            setOpenModalResult(true);
            setIsFinish(true)
        }


        setGuesses(newGuesses);
        setFlipped(newFlipped)
        setCounter(counter + 1)
    }

    useEffect(() => {
        const bombs = generateUniqueRandomNumbers(settings.bomb, 1, blocks.length);
        setBombList(bombs);
        setblocks(generateArrayNumber(settings.block))
    }, [settings, blocks.length])



    useEffect(() => {
        if (countBoolean(guesses, true) === (blocks.length - bombList.length)) {//mengecek apakah bom sudah terpilih atau tidak
            setIsWin(true)
            setIsFinish(true)
            setOpenModalResult(true)
        }

    }, [guesses, blocks, bombList])

    return (
        <>
            <section className={`${start ? "" : "hidden"} flex h-screen flex-col items-center justify-center md:flex-row text-white`}>

                <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px]  grid grid-cols-3 gap-8">
                    {
                        blocks.map((item, index) => {
                            return (
                                <button type="button" className={`flipper `} key={item} disabled={isFinish} onClick={() => checkInput(item, index)}>
                                    <div className={`flipper-card ${flipped[index] ? "flipped" : ''}`}>
                                        <div className="flipper-front">
                                            <Image src={Question} alt="question" className="w-[70px] md:w-fit"/>
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
                <div className="order-first md:order-last">
                    <Timer />

                </div>
            </section>

            <ModalResult isWin={isWin} active={openModalResult} />
        </>
    )
}
