"use client"

import { useResults } from "@/hooks/menuStore"

export default function RestartButton() {
    const { results } = useResults()
    

    return (
        <button type="button" className={`${results.isFinish ? "" : "hidden"} bg-yellow-500 px-4 py-3 rounded-lg text-black`} onClick={() => window.location.reload()}>
            Restart
        </button>
    )
}
