'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

const checkIsTouchOrMobile = () => {
    if (typeof window === 'undefined') return true;
    return Boolean(
        window.matchMedia?.('(pointer: coarse)')?.matches ||
        window.matchMedia?.('(hover: none)')?.matches ||
        window.innerWidth <= 1024
    );
};

const ClickSpark = ({
    sparkColor = '#ff5e00ff',
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 400,
    easing = 'ease-out',
    extraScale = 1.0,
    children
}) => {
    const [isTouchOrMobile, setIsTouchOrMobile] = useState(true);
    const canvasRef = useRef(null);
    const sparksRef = useRef([]);
    const startTimeRef = useRef(null);
    const animationIdRef = useRef(null);

    useEffect(() => {
        const updateDevice = () => {
            setIsTouchOrMobile(checkIsTouchOrMobile());
        };
        updateDevice();
        window.addEventListener('resize', updateDevice, { passive: true });
        return () => window.removeEventListener('resize', updateDevice);
    }, []);

    useEffect(() => {
        if (isTouchOrMobile) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        let resizeTimeout;

        const resizeCanvas = () => {
            const { width, height } = parent.getBoundingClientRect();
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
        };

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 100);
        };

        const ro = new ResizeObserver(handleResize);
        ro.observe(parent);

        resizeCanvas();

        return () => {
            ro.disconnect();
            clearTimeout(resizeTimeout);
        };
    }, [isTouchOrMobile]);

    const easeFunc = useCallback(
        t => {
            switch (easing) {
                case 'linear':
                    return t;
                case 'ease-in':
                    return t * t;
                case 'ease-in-out':
                    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                default:
                    return t * (2 - t);
            }
        },
        [easing]
    );

    const startAnimation = useCallback(() => {
        if (animationIdRef.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const draw = timestamp => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            sparksRef.current = sparksRef.current.filter(spark => {
                const elapsed = timestamp - spark.startTime;
                if (elapsed >= duration) {
                    return false;
                }

                const progress = elapsed / duration;
                const eased = easeFunc(progress);

                const distance = eased * sparkRadius * extraScale;
                const lineLength = sparkSize * (1 - eased);

                const x1 = spark.x + distance * Math.cos(spark.angle);
                const y1 = spark.y + distance * Math.sin(spark.angle);
                const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
                const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

                ctx.strokeStyle = sparkColor;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();

                return true;
            });

            if (sparksRef.current.length > 0) {
                animationIdRef.current = requestAnimationFrame(draw);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                animationIdRef.current = null;
                startTimeRef.current = null;
            }
        };

        animationIdRef.current = requestAnimationFrame(draw);
    }, [duration, easeFunc, extraScale, sparkColor, sparkRadius, sparkSize]);

    useEffect(() => {
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, []);

    const handleClick = e => {
        if (isTouchOrMobile) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const now = performance.now();
        const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
            x,
            y,
            angle: (2 * Math.PI * i) / sparkCount,
            startTime: now
        }));

        sparksRef.current.push(...newSparks);
        startAnimation();
    };

    if (isTouchOrMobile) {
        return <>{children}</>;
    }

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%'
            }}
            onClick={handleClick}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    userSelect: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 1000
                }}
            />
            {children}
        </div>
    );
};

export default ClickSpark;

