import { useState, useEffect } from 'react'

export const useAnimation = (delay: number = 0) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, delay)

        return () => clearTimeout(timer)
    }, [delay])

    return isVisible
}

export const useStaggeredAnimation = (itemCount: number, baseDelay: number = 0, delayIncrement: number = 100) => {
    const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false))

    useEffect(() => {
        const timers = itemCount > 0
            ? Array.from({ length: itemCount }).map((_, index) =>
                setTimeout(() => {
                    setVisibleItems(prev => {
                        const newState = [...prev]
                        newState[index] = true
                        return newState
                    })
                }, baseDelay + index * delayIncrement)
            )
            : []

        return () => {
            timers.forEach(timer => clearTimeout(timer))
        }
    }, [itemCount, baseDelay, delayIncrement])

    return visibleItems
}
