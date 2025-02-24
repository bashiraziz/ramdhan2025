import type React from "react"
export function Input({
  className,
  ...props
}: {
  className?: string
} & React.InputHTML<HTMLInputElement>) {
  return (
    <input
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 ${className}`}
      {...props}
    />
  )
}

