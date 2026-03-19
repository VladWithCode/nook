import { cn } from "@/lib/utils";

export function Facebook({ className }: { className?: string }) {
    return (
        <svg className={cn("fill-current aspect-square size-6", className)} viewBox="-5 0 20 20">
            <path
                d="M 6.82128,20 V 11 H 9.55369 L 10,7 H 6.82128 V 5.052 C 6.82128,4.022 6.84758,3 8.28688,3 H 9.74469 V 0.14 C 9.74469,0.097 8.4925,0 7.22569,0 4.58,0 2.92341,1.657 2.92341,4.7 V 7 H 0 v 4 h 2.92341 v 9 z"
                id="fb" />
        </svg>
    );
}
