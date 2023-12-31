import Image from "next/image"
import Link from "next/link"


export default function Menu() {
    return (
        <div className={`h-screen flex flex-col items-center justify-center`}>
            <div>
                <Image src="/image/logo-remove.png" width={500} height={300} alt="Logo" />
            </div>
            <ul className="flex flex-col items-center gap-y-6">
                <li><Link href="/gameplay" className="button-77" >Play game</Link></li>
                <li><Link href="/credits" className="button-77">Credits</Link></li>
            </ul>

        </div>
    )
}
