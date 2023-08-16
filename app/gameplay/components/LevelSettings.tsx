"use client"
import { FormEvent, useState } from "react"
import { useStartStore, useSettingsStore, useAskHelp } from "@/hooks/menuStore";
import { generateSettings } from "@/constant/settings";


export default function LevelSettings() {

    const { settings, changeSettings } = useSettingsStore()
    const { changeStart } = useStartStore()
    const { changeAskHelp } = useAskHelp()

    
    return (
        <>

            <div className="mt-3 text-white">
                <h4 className="mt-5 font-bold text-xl text-green-800">Level setting</h4>
                <div className="mt-4">
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
                    <div className="w-full flex items-center justify-center gap-x-5 pt-4">
                        <span >Bantuan (belum jadi)</span>

                        <div className="checkbox-wrapper-22 mt-2">
                            <label className="switch" htmlFor="checkbox">
                                <input type="checkbox" id="checkbox" onChange={(e) =>
                                    e.target.checked ? 
                                    changeAskHelp({
                                        ask: true,
                                        active: false,
                                        isCorrect: false
                                    }) : changeAskHelp({
                                        ask: false,
                                        active: false,
                                        isCorrect: false
                                    })
                                } />
                                <div className="slider round"></div>
                            </label>
                        </div>
                    </div>

                    <button type='button' className="text-black mt-6 bg-yellow-400 w-full py-3 rounded-3xl font-bricolage font-bold"
                        onClick={() => changeStart("pre-start")}>
                        Start
                    </button>

                </div>
            </div>

        </>
    )
}
