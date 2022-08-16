import { keyframes } from "@emotion/react"

const smoothAppear = keyframes`
    from {
        opacity: 0;
        transform: translateY(-5%);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`
const slide = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0%);
    }
`
const pop = keyframes`
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.2);
    }
`
const shrink = keyframes`
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0.8);
    }
`
const animations = [
    smoothAppear,
    slide,
    pop,
    shrink,
]

export default animations
