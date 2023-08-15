"use client"
import { useState, FormEvent, ChangeEvent } from "react"
import { useStartStore, useSettingsStore } from "@/hooks/menuStore";

type setting = {
    type: string,
    block: number,
    bomb: number,
    minutes: number,
    seconds: number,
}
export default function CustomSettings() {
    const [customSetting, setCustomSetting] = useState<setting>({
        type: "Custom",
        block: 0,
        bomb: 0,
        minutes: 0,
        seconds: 0,

    })
    const { changeStart } = useStartStore()
    const { changeSettings } = useSettingsStore()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(customSetting)
        changeSettings(customSetting)
        changeStart("pre-start")
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setCustomSetting({
            ...customSetting,
            [name]: parseInt(value)
        })
    }

    return (
        <div className="w-[300px]">
            {/* <button onClick={() => console.log(settings)}>Check setting</button> */}
            <h4 className="mt-5 font-bold font-bricolage text-xl text-yellow-700">Custom Settings</h4>
            <form onSubmit={handleSubmit} className="font-comic">
                <div className='mt-2 flex justify-between'>
                    <label htmlFor="block" className="text-white">Banyak blok</label>
                    <input type="number" id="block" name="block" defaultValue={customSetting.block} className="field w-10 h-10 text-center" onChange={handleChange} />
                </div>
                <div className='mt-2 flex justify-between'>
                    <label htmlFor="bomb" className="text-white">Banyak bomb</label>
                    <input type="number" id="bomb" name="bomb" defaultValue={customSetting.bomb} className="field w-10 h-10 text-center" onChange={handleChange} />
                </div>
                <div className='mt-2 flex justify-between'>
                    <label className="text-white">Menit : Detik</label>
                    <div>
                        <input type="number" name="minutes" defaultValue={customSetting.minutes} className="field w-10 h-10 text-center" onChange={handleChange} />
                        <span className="inline-block mx-3 text-white text-3xl font-bricolage">:</span>
                        <input type="number" name="seconds" defaultValue={customSetting.seconds} className="field w-10 h-10 text-center" onChange={handleChange} />
                    </div>
                </div>

                <button type='submit' className="text-black mt-6 bg-yellow-400 w-full py-3 rounded-3xl font-bricolage font-bold">Start</button>
            </form>
        </div>
    )
}
