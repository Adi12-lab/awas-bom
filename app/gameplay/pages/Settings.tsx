"use client"


import CustomSettings from "../components/CustomSettings";
import LevelSettings from "../components/LevelSettings";
import { useStartStore } from "@/hooks/menuStore";

export default function Settings() {
    const { start } = useStartStore()

    return (
        <div>
            <div className={`${start !== "stop" ? "hidden" : ""} w-full flex flex-col justify-center items-center h-screen`}>
                <h3 className='text-4xl font-sigmar text-orange-600'>
                    Peraturan permainan
                </h3>

                <LevelSettings />
                <CustomSettings />
            </div>

        </div>
    )
}
