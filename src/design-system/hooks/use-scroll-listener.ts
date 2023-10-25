import { RefObject, useEffect } from "react";

export const useScrollListener = (scrollRef?: RefObject<HTMLDivElement>, listener?: (y: number) => void) => {
    const handleScroll = () => {
        listener?.(scrollRef?.current?.scrollTop || 0);
    }

    /** 
     * Add scroll event listener
    */
    useEffect(() => {
        scrollRef?.current?.addEventListener('scroll', handleScroll);
        return () => {
            scrollRef?.current?.removeEventListener('scroll', handleScroll);
        };
    }, []);
}