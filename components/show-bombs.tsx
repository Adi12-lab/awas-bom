"use client"
import { useShowBombs, useResults } from "@/hooks/menuStore"
export default function ShowBombs() {
    const { changeIsShow } = useShowBombs()
    const { results } = useResults()
    return (
        <button type="button" className={`${results.isFinish ? "" : "hidden"} bg-blue-500 px-4 py-3 rounded-lg me-2`} onClick={() => changeIsShow(true)}>
            Lihat bom
        </button>
    )
}
