import { useState, useEffect } from 'react'

export const useAnimation = (delay: number = 0) => {
    // Simple hook to toggle a boolean after `delay` milliseconds.
    // Useful for entrance animations where elements become visible
    // after a short timeout to trigger CSS transitions.
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
    // Returns a boolean array indicating which items are visible based
    // on staggered timeouts. Useful to animate lists with staggered delays.
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
