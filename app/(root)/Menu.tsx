"use client"

import Image from "next/image"
import Logo from "@/public/image/logo.jpg"
import Link from "next/link"


export default function Menu() {
    return (
        <div className={`h-screen flex flex-col items-center justify-center`}>
            <div>
                <Image src={Logo} alt="Logo" className="w-[500px] h-[300px]" />
            </div>
            <ul className="flex flex-col items-center gap-y-6">
                <li><Link href="/gameplay" className="button-77" >Play game</Link></li>
                <li><Link href="/history" className="button-77">History</Link></li>
            </ul>

        </div>
    )
}
