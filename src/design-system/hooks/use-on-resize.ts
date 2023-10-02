import { useEffect } from "react";

export const useOnResize = (callback: () => void) => {
    useEffect(() => {
        window.addEventListener('resize', callback)
        return () => window.removeEventListener('resize', callback)
    }, []);
}