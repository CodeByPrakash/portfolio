'use client';

import { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import './TargetCursor.css';

// A position: fixed element is positioned relative to the viewport UNLESS an
// ancestor establishes a containing block (transform, perspective, filter,
// will-change of those, or contain). When that happens, the cursor's translate
// no longer maps to viewport coordinates, so we measure and compensate for it.
const getContainingBlock = element => {
    let node = element?.parentElement;
    while (node && node !== document.documentElement) {
        const style = getComputedStyle(node);
        if (
            style.transform !== 'none' ||
            style.perspective !== 'none' ||
            style.filter !== 'none' ||
            style.willChange.includes('transform') ||
            style.willChange.includes('perspective') ||
            style.willChange.includes('filter') ||
            /paint|layout|strict|content/.test(style.contain)
        ) {
            return node;
        }
        node = node.parentElement;
    }
    return null;
};

const getContainingBlockOffset = block => {
    if (!block) return { x: 0, y: 0 };
    const rect = block.getBoundingClientRect();
    return { x: rect.left + block.clientLeft, y: rect.top + block.clientTop };
};

const checkIsMobileOrTablet = () => {
    if (typeof window === 'undefined') return true;
    const isTouchOnly = window.matchMedia?.('(pointer: coarse)')?.matches;
    const hasNoHover = window.matchMedia?.('(hover: none)')?.matches;
    const isSmallOrTabletScreen = window.innerWidth <= 1024;
    const hasTouchScreen = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|tablet|mobile|silk|kindle/i;
    const isMobileUA = mobileRegex.test(navigator.userAgent || '');
    return Boolean(isTouchOnly || hasNoHover || (hasTouchScreen && isSmallOrTabletScreen) || isMobileUA || isSmallOrTabletScreen);
};

const TargetCursor = ({
    targetSelector = 'a[href], button, [role="button"], input[type="submit"], input[type="button"], .cursor-target',
    spinDuration = 2,
    hideDefaultCursor = true,
    hoverDuration = 0.2,
    parallaxOn = true,
    cursorColor = '#ffffff',
    cursorColorOnTarget
}) => {
    const [mounted, setMounted] = useState(false);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(true);
    const cursorRef = useRef(null);
    const cornersRef = useRef(null);
    const spinTl = useRef(null);
    const dotRef = useRef(null);
    const containingBlockRef = useRef(null);

    const isActiveRef = useRef(false);
    const targetCornerPositionsRef = useRef(null);
    const tickerFnRef = useRef(null);
    const activeStrengthRef = useRef(0);
    const activeTargetRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        const updateDevice = () => {
            setIsMobileOrTablet(checkIsMobileOrTablet());
        };
        updateDevice();
        window.addEventListener('resize', updateDevice, { passive: true });
        window.addEventListener('orientationchange', updateDevice, { passive: true });
        return () => {
            window.removeEventListener('resize', updateDevice);
            window.removeEventListener('orientationchange', updateDevice);
        };
    }, []);

    useEffect(() => {
        if (isMobileOrTablet) {
            document.body.classList.remove('target-cursor-hidden');
        }
    }, [isMobileOrTablet]);

    const constants = useMemo(
        () => ({
            borderWidth: 3,
            cornerSize: 12
        }),
        []
    );

    const moveCursor = useCallback((x, y) => {
        if (!cursorRef.current) return;
        const { x: offsetX, y: offsetY } = getContainingBlockOffset(containingBlockRef.current);
        gsap.to(cursorRef.current, {
            x: x - offsetX,
            y: y - offsetY,
            duration: 0.1,
            ease: 'power3.out'
        });
    }, []);

    useEffect(() => {
        if (isMobileOrTablet || !cursorRef.current || !mounted) return;

        if (hideDefaultCursor) {
            document.body.classList.add('target-cursor-hidden');
        }

        const cursor = cursorRef.current;
        cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');

        containingBlockRef.current = getContainingBlock(cursor);
        const getOffset = () => getContainingBlockOffset(containingBlockRef.current);

        let activeTarget = null;
        let currentLeaveHandler = null;
        let resumeTimeout = null;

        const { cornerSize, borderWidth } = constants;
        const defaultCornerPositions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
        ];

        if (cornersRef.current) {
            Array.from(cornersRef.current).forEach((corner, i) => {
                gsap.set(corner, {
                    x: defaultCornerPositions[i].x,
                    y: defaultCornerPositions[i].y
                });
            });
        }

        const cleanupTarget = target => {
            if (currentLeaveHandler && target) {
                target.removeEventListener('mouseleave', currentLeaveHandler);
            }
            currentLeaveHandler = null;
        };

        const initialOffset = getOffset();
        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50,
            x: window.innerWidth / 2 - initialOffset.x,
            y: window.innerHeight / 2 - initialOffset.y,
            opacity: 0
        });

        const createSpinTimeline = () => {
            if (spinTl.current) {
                spinTl.current.kill();
            }
            spinTl.current = gsap
                .timeline({ repeat: -1 })
                .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
        };

        createSpinTimeline();

        const updateTargetCorners = target => {
            if (!target) return;
            const rect = target.getBoundingClientRect();
            const { x: offsetX, y: offsetY } = getOffset();
            targetCornerPositionsRef.current = [
                { x: rect.left - borderWidth - offsetX, y: rect.top - borderWidth - offsetY },
                { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.top - borderWidth - offsetY },
                { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY },
                { x: rect.left - borderWidth - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY }
            ];
        };

        const tickerFn = () => {
            if (!cursorRef.current || !cornersRef.current) {
                return;
            }

            if (activeTargetRef.current) {
                updateTargetCorners(activeTargetRef.current);
            }

            if (!targetCornerPositionsRef.current) {
                return;
            }

            const strength = activeStrengthRef.current;
            if (strength === 0) return;

            const cursorX = gsap.getProperty(cursorRef.current, 'x');
            const cursorY = gsap.getProperty(cursorRef.current, 'y');

            const corners = Array.from(cornersRef.current);
            corners.forEach((corner, i) => {
                const currentX = gsap.getProperty(corner, 'x');
                const currentY = gsap.getProperty(corner, 'y');

                const targetX = targetCornerPositionsRef.current[i].x - cursorX;
                const targetY = targetCornerPositionsRef.current[i].y - cursorY;

                const finalX = currentX + (targetX - currentX) * strength;
                const finalY = currentY + (targetY - currentY) * strength;

                const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

                gsap.to(corner, {
                    x: finalX,
                    y: finalY,
                    duration: duration,
                    ease: duration === 0 ? 'none' : 'power1.out',
                    overwrite: 'auto'
                });
            });
        };

        tickerFnRef.current = tickerFn;

        let hasMoved = false;
        const moveHandler = e => {
            if (!hasMoved) {
                hasMoved = true;
                gsap.to(cursorRef.current, { opacity: 1, duration: 0.2, overwrite: 'auto' });
            }
            moveCursor(e.clientX, e.clientY);
        };
        window.addEventListener('mousemove', moveHandler);

        const mouseLeaveHandler = () => {
            if (cursorRef.current) {
                gsap.to(cursorRef.current, { opacity: 0, duration: 0.2 });
            }
        };
        const mouseEnterHandler = () => {
            if (cursorRef.current && hasMoved) {
                gsap.to(cursorRef.current, { opacity: 1, duration: 0.2 });
            }
        };
        document.addEventListener('mouseleave', mouseLeaveHandler);
        document.addEventListener('mouseenter', mouseEnterHandler);

        const scrollHandler = () => {
            if (!activeTarget || !cursorRef.current) return;
            const { x: offsetX, y: offsetY } = getOffset();
            const mouseX = gsap.getProperty(cursorRef.current, 'x') + offsetX;
            const mouseY = gsap.getProperty(cursorRef.current, 'y') + offsetY;
            const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
            const isStillOverTarget =
                elementUnderMouse &&
                (elementUnderMouse === activeTarget || (elementUnderMouse.closest && elementUnderMouse.closest(targetSelector) === activeTarget));
            if (!isStillOverTarget) {
                if (currentLeaveHandler) {
                    currentLeaveHandler();
                }
            }
        };
        window.addEventListener('scroll', scrollHandler, { passive: true });

        const mouseDownHandler = () => {
            if (!dotRef.current) return;
            gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
            gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
        };

        const mouseUpHandler = () => {
            if (!dotRef.current) return;
            gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
            gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
        };

        window.addEventListener('mousedown', mouseDownHandler);
        window.addEventListener('mouseup', mouseUpHandler);

        const enterHandler = e => {
            const target = e.target?.closest?.(targetSelector);
            if (!target || !cursorRef.current || !cornersRef.current) return;
            if (target.disabled || target.getAttribute('aria-disabled') === 'true') return;
            const rect = target.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            if (activeTarget === target) return;
            if (activeTarget) {
                cleanupTarget(activeTarget);
            }
            if (resumeTimeout) {
                clearTimeout(resumeTimeout);
                resumeTimeout = null;
            }

            activeTarget = target;
            activeTargetRef.current = target;
            const corners = Array.from(cornersRef.current);
            corners.forEach(corner => gsap.killTweensOf(corner, 'x,y'));

            gsap.killTweensOf(cursorRef.current, 'rotation');
            spinTl.current?.pause();
            gsap.set(cursorRef.current, { rotation: 0 });

            if (cursorColorOnTarget) {
                if (cursorRef.current) cursorRef.current.style.mixBlendMode = 'normal';
                gsap.to(corners, {
                    borderColor: cursorColorOnTarget,
                    duration: 0.15,
                    ease: 'power2.out'
                });
                if (dotRef.current) {
                    gsap.to(dotRef.current, {
                        backgroundColor: cursorColorOnTarget,
                        duration: 0.15,
                        ease: 'power2.out'
                    });
                }
            }

            updateTargetCorners(target);
            const cursorX = gsap.getProperty(cursorRef.current, 'x');
            const cursorY = gsap.getProperty(cursorRef.current, 'y');

            isActiveRef.current = true;
            gsap.ticker.add(tickerFnRef.current);

            gsap.to(activeStrengthRef, {
                current: 1,
                duration: hoverDuration,
                ease: 'power2.out'
            });

            corners.forEach((corner, i) => {
                gsap.to(corner, {
                    x: targetCornerPositionsRef.current[i].x - cursorX,
                    y: targetCornerPositionsRef.current[i].y - cursorY,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });

            const leaveHandler = () => {
                gsap.ticker.remove(tickerFnRef.current);

                isActiveRef.current = false;
                targetCornerPositionsRef.current = null;
                activeTargetRef.current = null;
                gsap.set(activeStrengthRef, { current: 0, overwrite: true });
                activeTarget = null;

                if (cursorColorOnTarget) {
                    if (cursorRef.current) cursorRef.current.style.mixBlendMode = 'difference';
                    if (cornersRef.current) {
                        gsap.to(Array.from(cornersRef.current), {
                            borderColor: cursorColor,
                            duration: 0.15,
                            ease: 'power2.out'
                        });
                    }
                    if (dotRef.current) {
                        gsap.to(dotRef.current, {
                            backgroundColor: cursorColor,
                            duration: 0.15,
                            ease: 'power2.out'
                        });
                    }
                }

                if (cornersRef.current) {
                    const corners = Array.from(cornersRef.current);
                    gsap.killTweensOf(corners, 'x,y');
                    const tl = gsap.timeline();
                    corners.forEach((corner, index) => {
                        tl.to(
                            corner,
                            {
                                x: defaultCornerPositions[index].x,
                                y: defaultCornerPositions[index].y,
                                duration: 0.3,
                                ease: 'power3.out'
                            },
                            0
                        );
                    });
                }

                resumeTimeout = setTimeout(() => {
                    if (!activeTarget && cursorRef.current && spinTl.current) {
                        const currentRotation = gsap.getProperty(cursorRef.current, 'rotation');
                        const normalizedRotation = currentRotation % 360;
                        spinTl.current.kill();
                        spinTl.current = gsap
                            .timeline({ repeat: -1 })
                            .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
                        gsap.to(cursorRef.current, {
                            rotation: normalizedRotation + 360,
                            duration: spinDuration * (1 - normalizedRotation / 360),
                            ease: 'none',
                            onComplete: () => {
                                spinTl.current?.restart();
                            }
                        });
                    }
                    resumeTimeout = null;
                }, 50);

                cleanupTarget(target);
            };

            currentLeaveHandler = leaveHandler;
            target.addEventListener('mouseleave', leaveHandler);
        };

        window.addEventListener('mouseover', enterHandler, { passive: true });

        const resizeHandler = () => {
            containingBlockRef.current = getContainingBlock(cursor);
        };
        window.addEventListener('resize', resizeHandler);

        return () => {
            if (tickerFnRef.current) {
                gsap.ticker.remove(tickerFnRef.current);
            }

            window.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseleave', mouseLeaveHandler);
            document.removeEventListener('mouseenter', mouseEnterHandler);
            window.removeEventListener('mouseover', enterHandler);
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('resize', resizeHandler);
            window.removeEventListener('mousedown', mouseDownHandler);
            window.removeEventListener('mouseup', mouseUpHandler);

            if (activeTarget) {
                cleanupTarget(activeTarget);
            }

            spinTl.current?.kill();
            if (hideDefaultCursor) {
                document.body.classList.remove('target-cursor-hidden');
            }

            isActiveRef.current = false;
            activeTargetRef.current = null;
            targetCornerPositionsRef.current = null;
            activeStrengthRef.current = 0;
        };
    }, [
        targetSelector,
        spinDuration,
        moveCursor,
        constants,
        hideDefaultCursor,
        isMobileOrTablet,
        mounted,
        hoverDuration,
        parallaxOn,
        cursorColor,
        cursorColorOnTarget
    ]);

    useEffect(() => {
        if (isMobileOrTablet || !cursorRef.current || !spinTl.current) return;
        if (spinTl.current.isActive()) {
            spinTl.current.kill();
            spinTl.current = gsap
                .timeline({ repeat: -1 })
                .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
        }
    }, [spinDuration, isMobileOrTablet]);

    if (!mounted || isMobileOrTablet || typeof document === 'undefined') {
        return null;
    }

    return createPortal(
        <div ref={cursorRef} className="target-cursor-wrapper">
            <div ref={dotRef} className="target-cursor-dot" style={{ backgroundColor: cursorColor }} />
            <div className="target-cursor-corner corner-tl" style={{ borderColor: cursorColor }} />
            <div className="target-cursor-corner corner-tr" style={{ borderColor: cursorColor }} />
            <div className="target-cursor-corner corner-br" style={{ borderColor: cursorColor }} />
            <div className="target-cursor-corner corner-bl" style={{ borderColor: cursorColor }} />
        </div>,
        document.body
    );
};

export default TargetCursor;

