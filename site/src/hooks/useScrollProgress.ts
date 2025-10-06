import {useEffect, useState} from 'react'

export function useScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight - windowHeight
            const scrolled = window.scrollY
            const progress = Math.min(scrolled / documentHeight, 1)
            setScrollProgress(progress)
        }

        window.addEventListener('scroll', handleScroll, {passive: true})
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return scrollProgress
}

export function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1
            })
        }

        window.addEventListener('mousemove', handleMouseMove, {passive: true})
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return mousePosition
}

