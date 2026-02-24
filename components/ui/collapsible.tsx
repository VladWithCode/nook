import { cn } from "@/lib/utils"
import { Collapsible as CollapsiblePrimitive } from "radix-ui"

function Collapsible({
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
    return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
    return (
        <CollapsiblePrimitive.CollapsibleTrigger
            data-slot="collapsible-trigger"
            {...props}
        />
    )
}

function CollapsibleContent({
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
    return (
        <CollapsiblePrimitive.CollapsibleContent
            data-slot="collapsible-content"
            {...props}
            className={cn(
                props.className,
                "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
            )}
            style={{
                "animationDuration": "0.8s",
                ...props.style,
            }}
        />
    )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
