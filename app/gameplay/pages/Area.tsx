"use client"
import { useState, useEffect } from "react"
import { gsap } from "gsap";
import {
    generateUniqueRandomNumbers,
    generateArrayNumber,
    countBoolean,
    subtractArrays,
    getRandomUniqueNumbers,
    combineArrays,
    removeObjectsByNumber,
    generateRandomNumber,
    checkIfElementsNotExist
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
    const [bonusKeyBlock, setBonusKeyBlock] = useState<numberBomb>({ num: -1, guessed: false });

    const [activeBlock, setActiveBlock] = useState<number[]>([])
    const [activeBonusKeyBlock, setActiveBonusKeyBlock] = useState(false)

    const checkInput = (num: number, index: number) => {//mengecek input
        setActiveBlock((prevState) => [...prevState, num]) //aktifkan block sekarang
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
        setActiveBonusKeyBlock(false)
        if (askHelp.ask) {
            changeAskHelp({
                ask: true,
                active: false,
                isCorrect: false
            })
        }
    }

    useEffect(() => {//memilih block yang mengandung pertanyaan
        if (checkIfElementsNotExist(choicedBlocks, activeBlock) && askHelp.ask) {
            changeAskHelp({
                ask: true,
                active: true,
                isCorrect: false,
            })

        }
    }, [activeBlock, choicedBlocks])


    useEffect(() => {//menginisialisasi
        const bombs = generateUniqueRandomNumbers(settings.bomb, 1, generateArrayNumber(settings.block).length);
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
        console.log("Choiced", choicedBlocks)
        if (askHelp.isCorrect) {
            setActiveBonusKeyBlock(true)
        }
        console.log("bonus key", bonusKeyBlock)
    }, [bonusKeyBlock])

    useEffect(() => {
        console.log(bombList)
        //pasangkan blocks dengan guessed
        if (askHelp.ask) {
            const transform1 = combineArrays(blocks, guesses)
            // console.log(transform1)
            const paramRemove = [...bombList, ...activeBlock]
            const transform2 = removeObjectsByNumber(transform1, paramRemove)//hilang dari bomblist, dan active
            const transform3 = removeObjectsByNumber(transform2, choicedBlocks)
            const transform4 = transform3.filter(item => item.guessed !== true)

            const indexRandom = generateRandomNumber(0, transform4.length)
            setBonusKeyBlock(transform4[indexRandom])
        }

    }, [bombList, guesses, activeBlock, askHelp])

    return (
        <>

            <section className={`${start === "start" ? "" : "hidden"}`}>
                <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px]  grid grid-cols-3 gap-8">
                    {
                        blocks.map((item, index) => {
                            return (
                                <button type="button" className={`flipper `} key={item} disabled={results.isFinish} onClick={() => checkInput(item, index)}>
                                    <div className={`flipper-card ${flipped[index] || isShow ? "flipped" : ''}`}>
                                        <div className={`flipper-front ${activeBonusKeyBlock && bonusKeyBlock?.num === item ? "bg-green-600" : "bg-[#c1c3c5]"}`}>
                                            <Image src={Question} alt="question" className="w-[70px] md:w-fit" />
                                        </div>
                                        <div className="flipper-back bg-[#c1c3c5]">
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
