"use client"
import { gsap } from "gsap"
import { useEffect, useRef } from "react";

import { useStartStore } from "@/hooks/menuStore";
export default function Counter() {
    const letter1 = useRef<HTMLSpanElement>(null)
    const letter2 = useRef<HTMLSpanElement>(null)
    const letter3 = useRef<HTMLSpanElement>(null)
    const letter4 = useRef<HTMLSpanElement>(null)

    const { start, changeStart } = useStartStore()

    
    let tl = gsap.timeline()
    
    //duration kadang garai gak kenek
    useEffect(() => {
        const handleComplete = () => {
            changeStart("start")//masuk ke arena
        }
        if (start === "pre-start") {
            tl.to(letter1.current, { scale: 1, opacity: 1, duration: .8, ease: "power4.out", delay: 0.5 }).
                to(letter1.current, { scale: 3, opacity: 0, ease: "power4.out", duration: .6 }).

                to(letter2.current, { scale: 1, opacity: 1, duration: .8, ease: "power4.out", delay: 0.5 }).
                to(letter2.current, { scale: 3, opacity: 0, ease: "power4.out", duration: .6 }).

                to(letter3.current, { scale: 1, opacity: 1, duration: .8, ease: "power4.out", delay: 0.5 }).
                to(letter3.current, { scale: 3, opacity: 0, ease: "power4.out", duration: .6 }).

                to(letter4.current, { opacity: 1, duration: .8, ease: "power4.out", delay: 0.5 }).
                to(letter4.current, { scale: 3, opacity: 0, ease: "power4.out", duration: .6, onComplete: handleComplete })

        }

    }, [tl, start, changeStart])


    return (
        <div className={`${start !== "pre-start" ? "hidden" : ""}`}>
            <h1 className="font-sigmar font-black text-6xl relative">
                <span ref={letter1} className="inline-block scale-[.2] opacity-0 absolute left-0 top-0">3</span>
                <span ref={letter2} className="inline-block scale-[.2] opacity-0 absolute left-0 top-0">2</span>
                <span ref={letter3} className="inline-block scale-[.2] opacity-0 absolute left-0 top-0">1</span>
                <span ref={letter4} className="inline-block w-[350px] opacity-0 absolute left-0 top-0 -translate-x-1/2">
                    Awas Bom
                </span>
            </h1>

        </div>
    )
}
