import { useMemo, useState } from 'react';

// The Below component returns the height and width of the Browser window 
// on every window resize happening 
// can run continuously

export const useViewPort = () => {
    const [screenWidth,setScreenWidth] = useState(window.innerWidth)
    const [screenHeight,setScreenHeight] = useState(window.innerHeight)
    
    useMemo(() => {
        const handleWindowResize = () => {
            setScreenWidth(window.innerWidth)
            setScreenHeight(window.innerHeight)
        }
        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    
    }, [])    
    return { screenWidth,screenHeight }
}