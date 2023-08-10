"use client"
import { useState, useEffect, FormEventHandler, FormEvent } from "react"
import { useMenuStore, useSettingsStore } from "@/hooks/menuStore";
import { generateSettings } from "@/constant/settings";
import { useRouter } from "next/navigation";
export default function Settings() {
    const router = useRouter()
    const initialSettings = generateSettings("easy");
    const [setting, setSetting] = useState({
        type: initialSettings.type,
        block: initialSettings.block,
        bomb: initialSettings.bomb,
    });
    const { menu, changeMenu } = useMenuStore()
    const {settings, changeSettings} = useSettingsStore()

    if(menu !== "settings") {
        router.push("/")
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(setting)
        changeSettings(setting)
        router.push("/")
    }

    return (
        <div className={`${menu === "settings" ? "" : "hidden"}`}>

            <h3 className='font-bold text-3xl'>
                Settings
            </h3>
            <div className="mt-3">
                <h4>Level setting</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <label htmlFor="settingEasy">Mudah</label>
                        <input type="radio" id="settingEasy" checked={setting.type === "Mudah"} onChange={() => setSetting(generateSettings("easy"))} />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="settingMedium">Awas</label>
                        <input type="radio" id="settingMedium" checked={setting.type === "Awas"} onChange={() => setSetting(generateSettings("medium"))}/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="settingHard">Ranjau</label>
                        <input type="radio"id="settingHard" checked={setting.type === "Ranjau"} onChange={() => setSetting(generateSettings("hard"))} />
                    </div>

                    <button type="submit">Save</button>

                </form>
            </div>



            <div>
                <form action="">
                    <div className='mt-4'>
                        <label htmlFor="block">Banyak blok</label>
                        <input type="number" id="block" className="border-2 border-orange-400" />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="bomb">Banyak bomb</label>
                        <input type="number" id="bomb" className="border-2 border-orange-400" />
                    </div>

                    <button type='submit'>Save</button>
                </form>
            </div>

        </div>
    )
}
