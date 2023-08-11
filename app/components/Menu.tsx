"use client"
import { useMenuStore } from "@/hooks/menuStore"
import Logo from "@/public/image/logo.jpg"
import Image from "next/image";
export default function Menu() {
  const { menu, changeMenu } = useMenuStore();



  return (
    <div className={`${menu !== "menu" ? "hidden" : ""} h-screen flex flex-col items-center justify-center`}>
      <div>
        <Image src={Logo} alt="Logo" className="w-[500px] h-[300px]" />
      </div>
      <ul className="flex flex-col items-center gap-y-6">
        <li><button className="button-77" type="button" onClick={() => changeMenu("play-game")}>Play game</button></li>
        <li><button className="button-77" type="button" onClick={() => changeMenu("settings")}>Settings</button></li>
        <li><button className="button-77">History</button></li>
      </ul>

    </div>
  )
}
