"use client"
import React, { useState, useEffect, useRef} from 'react';
import { useResults } from '@/hooks/menuStore';


export default function ModalResult() {
    const [isActive, setIsActive] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const {results} = useResults()

    useEffect(() => {
        console.log(results)
        if(results.isFinish) setIsActive(true)
    },[results])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsActive(false)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={modalRef}
            className={`${isActive ? 'animate-result' : 'hidden'
                } h-[200px] w-full bg-glass absolute top-1/2 left-0 -translate-y-1/2 z-[800]`}
        >
            <h2
                className={`custom-shadow text-center leading-[200px] font-sigmar text-6xl tracking-[10px] ${results.result === "win" ? 'text-green-400' : 'text-red-400'
                    }`}
            >
                {results.result === "win" ? 'Menang' : 'Kalah'}
            </h2>
        </div>
    );
}
