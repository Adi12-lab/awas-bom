"use client"


import CustomSettings from "../components/CustomSettings";
import LevelSettings from "../components/LevelSettings";
import { useStartStore } from "@/hooks/menuStore";

export default function Settings() {
    const { start } = useStartStore()

    return (
        <div>
            <div className={`${start !== "stop" ? "hidden" : ""} flex flex-col items-center`}>
                <h3 className='text-4xl font-sigmar text-orange-600'>
                    Peraturan permainan
                </h3>

                <LevelSettings />
                <CustomSettings />
            </div>

        </div>
    )
}
