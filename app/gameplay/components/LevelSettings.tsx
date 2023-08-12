"use client"
import { useState, FormEvent } from "react"
import { useStartStore, useSettingsStore } from "@/hooks/menuStore";
import { generateSettings } from "@/constant/settings";


export default function LevelSettings() {
    const initialSettings = generateSettings("easy");
    const [setting, setSetting] = useState({
        type: initialSettings.type,
        block: initialSettings.block,
        bomb: initialSettings.bomb,
    });
    
    const { changeSettings } = useSettingsStore()
    const {changeStart} = useStartStore()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(setting)
        changeSettings(setting)
        changeStart(true)
    }
    
    return (
        <>
          
            <div className="mt-3 text-white">
                <h4 className="mt-5 font-bold text-xl text-green-800">Level setting</h4>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="font-comic">
                        <div className="radio-btn">
                            <input type="radio" id="settingEasy" checked={setting.type === "Mudah"} onChange={() => setSetting(generateSettings("easy"))} />
                            <label htmlFor="settingEasy">Mudah</label>
                        </div>
                        <div className="radio-btn">
                            <input type="radio" id="settingMedium" checked={setting.type === "Awas"} onChange={() => setSetting(generateSettings("medium"))} />
                            <label htmlFor="settingMedium">Awas</label>
                        </div>
                        <div className="radio-btn">
                            <input type="radio" id="settingHard" checked={setting.type === "Ranjau"} onChange={() => setSetting(generateSettings("hard"))} />
                            <label htmlFor="settingHard">Ranjau</label>
                        </div>
                    </div>

                    <button type='submit' className="text-black mt-6 bg-yellow-400 w-full py-3 rounded-3xl font-bricolage font-bold">Save</button>

                </form>
            </div>

        </>
    )
}
