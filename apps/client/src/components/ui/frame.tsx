import { cn } from "@/lib/utils"

function Frame({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("py-14 px-10 box-border", className)}>{children}</div>
  )
}

export { Frame }
