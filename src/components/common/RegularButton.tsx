import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type RegularButtonProps = {
  children: React.ReactNode,
} & ButtonHTMLAttributes<HTMLButtonElement>

const RegularButton = ({ children, type = "button", ...props}: RegularButtonProps) => {
  return (
    <button
      type={type}
      {...props}
      className={cn(
        "flex items-center justify-center rounded-md px-4 py-2 w-full cursor-pointer",
        "bg-green-900 text-white text-xl hover:bg-btn-hover hover:text-green-900",
        "disabled:opacity-20 disabled:bg-btn-hover disabled:text-grey-400",
        "disabled:cursor-not-allowed disabled:pointer-events-none", 
        "focus:outline-none focus-visible:ring-3 focus-visible:ring-offset-1 focus-visible:ring-primary",
        "transition-colors duration-150",
        props.className
      )}
    >
      {children}
    </button>
  )
}

export default RegularButton