export function StackIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5L3 9l9 4.5 9-4.5-9-4.5zM3 13.5l9 4.5 9-4.5M3 18l9 4.5 9-4.5"
      />
    </svg>
  )
}
