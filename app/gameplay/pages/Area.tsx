"use client"
import { useState, useEffect } from "react"
import {
    generateUniqueRandomNumbers,
    generateArrayNumber,
    countBoolean,
    subtractArrays,
    getRandomUniqueNumbers,
    combineArrays,
    removeObjectsByNumber,
    generateRandomNumber
} from "@/helpers";
import {
    useStartStore,
    useSettingsStore,
    useResults,
    useShowBombs,
    useAskHelp
} from "@/hooks/menuStore";

import Question from "@/public/image/question.png"
import Image from "next/image";
import Bomb from "@/public/image/bomb.png"
import Checklist from "@/public/image/icons8-check-96.png"


type numberBomb = {
    num: number,
    guessed: boolean
}
export default function Area() {
    const { settings } = useSettingsStore()
    const { start } = useStartStore() //Bermain atau tidak
    const { results, changeResults } = useResults()
    const { isShow } = useShowBombs()
    const { askHelp, changeAskHelp } = useAskHelp()



    const [blocks, setblocks] = useState<number[]>(generateArrayNumber(12))
    const [guesses, setGuesses] = useState(Array(blocks.length).fill(false));
    const [flipped, setFlipped] = useState(Array(blocks.length).fill(false));
    const [bombList, setBombList] = useState<number[]>([]);
    const [choicedBlocks, setChoicedBlocks] = useState<number[]>([]);
    const [bonusBlocks, setBonusBlocks] = useState<number[]>([]);
    const [bonusKeyBlock, setBonusKeyBlock] = useState<numberBomb>({ num: -1, guessed: false });

    const [activeBlock, setActiveBlock] = useState<number>(0)

    const checkInput = (num: number, index: number) => {
        setActiveBlock(num) //aktifkan block sekarang
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
        if (choicedBlocks.includes(activeBlock) && askHelp.ask) {
            changeAskHelp({
                ask: true,
                active: true,
                isCorrect: false,
            })

        }
    }, [activeBlock, choicedBlocks])


    useEffect(() => {
        const bombs = generateUniqueRandomNumbers(settings.bomb, 1, blocks.length);
        const saveBlocks = subtractArrays(blocks, bombs)

        setChoicedBlocks(getRandomUniqueNumbers(saveBlocks, settings.help as number))
        setBombList(bombs);
        setblocks(generateArrayNumber(settings.block))

    }, [settings])



    useEffect(() => {
        if (countBoolean(guesses, true) === (blocks.length - bombList.length)) {//mengecek apakah bom sudah terpilih atau tidak

            changeResults({
                isFinish: true,
                result: "win"
            })
        }

    }, [guesses, changeResults])

    useEffect(() => {
        if (askHelp.isCorrect) {
        }
    }, [askHelp, bonusBlocks])

    // useEffect(() => {
    //     //pasangkan blocks dengan guessed
    //     if (blocks.length !== 0) {
    //         const transform1 = combineArrays(blocks, guesses)
    //         const paramRemove = [...bombList, activeBlock]
    //         const transform2 = removeObjectsByNumber(transform1, paramRemove)
    //         const transform3 = transform2.filter(item => item.guessed !== true)

    //         const indexRandom = generateRandomNumber(0, transform3.length)
    //         setBonusKeyBlock(transform3[indexRandom])
    //     }

    // }, [bombList, guesses, activeBlock])

    return (
        <>

            <section className={`${start === "start" ? "" : "hidden"} text-white`}>
                <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px]  grid grid-cols-3 gap-8">
                    {
                        blocks.map((item, index) => {
                            return (
                                <button type="button" className={`flipper ${bonusKeyBlock?.num === index ? "bg-green-700" : ""} `} key={item} disabled={results.isFinish} onClick={() => checkInput(item, index)}>
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
