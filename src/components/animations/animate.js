import { useEffect } from 'react';
import { motion, useAnimate, usePresence } from 'framer-motion';

const useEnterAnimation = (element, animationProps, duration, delay) => {
    const [isPresent] = usePresence();
    const [animate] = useAnimate();

    useEffect(() => {
        if (isPresent) {
            const enterAnimation = async () => {
                await animate(
                    element,
                    animationProps,
                    { duration, delay }
                );
            };
            enterAnimation();
        }
    }, [element, animationProps, duration, delay, animate, isPresent]);
};

export default useEnterAnimation;