import { useState, useEffect, useEffectEvent } from 'react';

type Breakpoints<T extends string = string> = Record<T, number>;

interface UseBreakpointOptions<T extends string = string> {
    breakpoints?: Breakpoints<T>;
    delay?: number;
}

export function useBreakpoint<T extends string = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>(
    options: UseBreakpointOptions<T> = {}
): T {
    const defaultBreakpoints = {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
    } as Breakpoints<T>;

    const {
        breakpoints = defaultBreakpoints,
        delay = 150
    } = options;

    // Extract getBreakpoint logic outside to avoid recreation
    function getBreakpointFromWidth(width: number): T {
        const sortedBreakpoints = Object.entries(breakpoints)
            .sort(([, a], [, b]) => (b as number) - (a as number));

        for (const [name, minWidth] of sortedBreakpoints) {
            if (width >= (minWidth as number)) {
                return name as T;
            }
        }
        return sortedBreakpoints[sortedBreakpoints.length - 1][0] as T;
    }

    const [breakpoint, setBreakpoint] = useState<T>(() => {
        if (typeof window === 'undefined') return '' as T;
        return getBreakpointFromWidth(window.innerWidth);
    });

    // useEffectEvent to avoid recreating the handler on every render
    const onResize = useEffectEvent(() => {
        setBreakpoint(getBreakpointFromWidth(window.innerWidth));
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let timeoutId: NodeJS.Timeout;

        const handleResize = (): void => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                onResize();
            }, delay);
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, [delay]); // Only re-run if delay changes

    return breakpoint;
}
