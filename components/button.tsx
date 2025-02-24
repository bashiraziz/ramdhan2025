import type React from "react"
export function Button({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <button className={`bg-gray-100 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ${className}`}>
      {children}
    </button>
  )
}

