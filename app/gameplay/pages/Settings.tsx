"use client"


import CustomSettings from "../components/CustomSettings";
import LevelSettings from "../components/LevelSettings";
import { useStartStore, useSettingsStore } from "@/hooks/menuStore";

export default function Settings() {
    const { start } = useStartStore()


  
    return (
        <div className="container max-w-full">
            <div className={`${start ? "hidden" : ""} w-full flex flex-col justify-center items-center h-screen`}>
                <h3 className='text-4xl font-sigmar text-orange-600'>
                    Peraturan permainan
                </h3>
                {/* <div className="flex text-white items-center gap-x-5 mt-4">
                    <h5 className="font-bricolage text-xl">Keterangan</h5>

                   
                </div> */}

                <LevelSettings />
                <CustomSettings />
            </div>

        </div>
    )
}
