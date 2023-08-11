"use client"
import { useMenuStore } from "@/hooks/menuStore"
export default function BackButton() {
  const {menu,changeMenu} =  useMenuStore()

  return (
    <button className={`${menu === "menu" ? "hidden" : ""} text-white font-bricolage z-[500] absolute top-9 left-3`} onClick={() => changeMenu("menu")}>Kembali</button>
  )
}
