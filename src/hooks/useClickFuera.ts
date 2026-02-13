import { useEffect, type RefObject } from "react";

export default function useClickFuera<T extends HTMLElement>(ref: RefObject<T>, onOutsideCLick: () => void) {
    const handleOutsideClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            onOutsideCLick();
        }
    }
    
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [ref, onOutsideCLick]);
}
