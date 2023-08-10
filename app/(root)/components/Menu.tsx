"use client"
import { useEffect } from "react";
import { useMenuStore } from "@/hooks/menuStore"
import { useRouter } from "next/navigation";
export default function Menu() {
  const { menu, changeMenu } = useMenuStore();
  const router = useRouter()


  useEffect(() => {
    if (menu == "play-game") router.push("/play-game")
    else if(menu == "settings") router.push("/settings")
  }, [menu, router])

  return (
    <div>
      <ul>
        <li><button type="button" onClick={() => changeMenu("play-game")}>Play game</button></li>
        <li><button type="button" onClick={() => changeMenu("settings")}>Settings</button></li>
        <li><button>History</button></li>
      </ul>

    </div>
  )
}
