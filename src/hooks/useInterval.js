import { useEffect, useRef } from "react";

export default function useInterval() {
    const useUseInterval = (callback, delay) => {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        });

        useEffect(() => {
            const tick = () => {
                savedCallback.current();
            }

            const timerId = setInterval(tick, delay);
            return () => clearInterval(timerId);
        }, [delay]);
    }
    return useUseInterval
}