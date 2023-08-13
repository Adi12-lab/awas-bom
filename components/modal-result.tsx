"use client"
import React, { useState, useEffect, useRef, MouseEventHandler } from 'react';

type ModalResultProps = {
    isWin: boolean;
    active: boolean;
};

export default function ModalResult({ isWin, active }: ModalResultProps) {
    const [isActive, setIsActive] = useState(active);

    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setIsActive(active)
    }, [active])


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
                className={`custom-shadow text-center leading-[200px] font-sigmar text-6xl tracking-[10px] ${isWin ? 'text-green-400' : 'text-red-400'
                    }`}
            >
                {isWin ? 'Menang' : 'Kalah'}
            </h2>
        </div>
    );
}
