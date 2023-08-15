"use client"
import { FormEvent } from "react"
import { useStartStore, useSettingsStore } from "@/hooks/menuStore";
import { generateSettings } from "@/constant/settings";


export default function LevelSettings() {
    
    const {settings, changeSettings } = useSettingsStore()
    const {changeStart} = useStartStore()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(settings)
        changeStart("pre-start")
    }
    
    return (
        <>
          
            <div className="mt-3 text-white">
                <h4 className="mt-5 font-bold text-xl text-green-800">Level setting</h4>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="font-comic">
                        <div className="radio-btn">
                            <input type="radio" id="settingEasy" checked={settings.type === "Mudah"} onChange={() => changeSettings(generateSettings("easy"))} />
                            <label htmlFor="settingEasy">Mudah</label>
                        </div>
                        <div className="radio-btn">
                            <input type="radio" id="settingMedium" checked={settings.type === "Awas"} onChange={() => changeSettings(generateSettings("medium"))} />
                            <label htmlFor="settingMedium">Awas</label>
                        </div>
                        <div className="radio-btn">
                            <input type="radio" id="settingHard" checked={settings.type === "Ranjau"} onChange={() => changeSettings(generateSettings("hard"))} />
                            <label htmlFor="settingHard">Ranjau</label>
                        </div>
                    </div>

                    <button type='submit' className="text-black mt-6 bg-yellow-400 w-full py-3 rounded-3xl font-bricolage font-bold">Start</button>

                </form>
            </div>

        </>
    )
}
