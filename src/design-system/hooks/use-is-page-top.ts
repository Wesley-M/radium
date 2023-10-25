import { useScroll, useScrollListener } from "@design-system/hooks";
import { useState } from "react";

export const useIsPageTop = () => {
    const [isTop, setIsTop] = useState(true)

    // Reference to scroll being controlled up in the hierarchy
    const scroll = useScroll()
    
    const handleScroll = (y: number) => {
      if (y < 10) {
        setIsTop(true)
      } else {
        setIsTop(false)
      }
    };

    useScrollListener(scroll?.scrollRef, handleScroll)

    return isTop
}