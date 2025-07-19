import type { InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type RegularInputProps = {
  label?: string
  errorMessage?: string | undefined
  icon?: string
} & InputHTMLAttributes<HTMLInputElement>

const RegularInput = ({ label, errorMessage, icon, ...props }: RegularInputProps) => {

  const { id, type, placeholder } = props

  return (
    <div className="flex flex-col gap-2 w-full">
      {(label || errorMessage) ? (
        <div className="flex justify-between items-center text-14-16">
          {label && (
            <label htmlFor={id} className="text-grey-500">
              {label}
            </label>
          )}
          {errorMessage ? (
            <span id={`${id}-error`} className="text-error" role="alert" aria-live="polite">
              {errorMessage}
            </span>
          ) : (
            <span className="sr-only" aria-live="polite"></span>
          )}
        </div>
      ) : null}
      <div className="relative w-full">
        {icon && (
          <span
            className="absolute inset-y-0 left-3 flex items-center pointer-events-none  text-grey-500"
          >
            <img src={icon} alt="" />
          </span>
        )}
        <input
          id={id}
          type={type || "text"}
          placeholder={placeholder ?? "0"}
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage ? `${id}-error` : undefined}
          {...props}
          className={cn(
            "flex items-center justify-center rounded-[.2rem] px-4 py-2 pl-8 w-full text-right text-xl",
            "bg-grey-50 text-green-900 placeholder:text-grey-400",
            "focus:border-none focus-visible:outline-2 focus-visible:outline-primary",
            errorMessage && "outline-2 !outline-error",
            props.className
          )}
        />
      </div>
    </div>
  )
}

export default RegularInput