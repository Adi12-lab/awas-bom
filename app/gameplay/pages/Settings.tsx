"use client"
import CustomSettings from "../components/CustomSettings";
import LevelSettings from "../components/LevelSettings";
import { useStartStore, useSettingsStore } from "@/hooks/menuStore";

export default function Settings() {
    const {start} = useStartStore()

    const { settings } = useSettingsStore()

    function checkTypeSettings(settingsType: string) {
        if (settingsType === "Mudah") {
            return "bg-green-700";
        } else if (settingsType === "Awas") {
            return "bg-yellow-500";
        } else if (settingsType === "Ranjau") {
            return "bg-red-800";
        } else {
            return "bg-blue-500";
        }
    }

    return (
        <div className="container max-w-full">
            <div className={`${start ? "hidden" : ""} w-full flex flex-col justify-center items-center h-screen`}>
                <h3 className='text-4xl font-sigmar text-orange-600'>
                    Settings
                </h3>
                <div className="flex text-white items-center gap-x-5 mt-4">
                    <h5 className="font-bricolage text-xl">Aktif : </h5>
                    <span className={`${checkTypeSettings(settings.type)} block w-[100px] h-10 leading-10 text-center rounded-lg`}>
                        {settings.type}
                    </span>
                </div>
       
                <LevelSettings />
                <CustomSettings />
            </div>

        </div>
    )
}
