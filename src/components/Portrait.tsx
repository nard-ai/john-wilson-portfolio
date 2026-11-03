import type { CSSProperties } from 'react'

/** Original line portrait: young man, short dark hair, slight smile, shoulders up. */
export function Portrait({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 320"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label="Line portrait of John"
    >
      {/* Hair, filled so it reads as short and dark */}
      <path
        d="M99 128C91 96 102 66 132 59C160 53 186 68 188 98C189 111 186 121 182 128C179 112 172 101 162 88C152 97 139 101 124 102C111 104 103 113 99 128Z"
        fill="currentColor"
      />
      {/* Face */}
      <path d="M100 116C99 152 105 183 122 202C130 211 136 215 140 215C144 215 150 211 158 202C175 183 181 152 181 116" />
      {/* Ears */}
      <path d="M100 140C91 134 86 149 91 159C94 166 99 167 102 165" />
      <path d="M181 140C190 134 195 149 190 159C187 166 182 167 179 165" />
      {/* Brows */}
      <path d="M112 134C117 130 125 129 130 131" />
      <path d="M151 131C156 129 164 130 169 134" />
      {/* Eyes */}
      <path d="M115 146C118 143 126 143 129 146" />
      <path d="M152 146C155 143 163 143 166 146" />
      <circle cx="122" cy="149" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="159" cy="149" r="2.2" fill="currentColor" stroke="none" />
      {/* Nose */}
      <path d="M141 152C140 162 137 170 135 174C138 177 143 177 146 175" />
      {/* Slight smile */}
      <path d="M127 188C134 194 148 194 155 187" />
      <path d="M124 186.5 127.5 188.5" />
      {/* Neck */}
      <path d="M126 207V236" />
      <path d="M154 207V236" />
      {/* Shoulders */}
      <path d="M126 233C100 240 72 246 54 262C42 273 37 295 35 320" />
      <path d="M154 233C180 240 208 246 226 262C238 273 243 295 245 320" />
      {/* Collar */}
      <path d="M117 237L132 262L140 249L148 262L163 237" />
      <path d="M140 254V320" />
      <circle cx="140" cy="278" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="140" cy="300" r="1.8" fill="currentColor" stroke="none" />
      {/* Shirt folds */}
      <path d="M86 268C90 288 92 304 92 320" />
      <path d="M194 268C190 288 188 304 188 320" />
    </svg>
  )
}

export function Cloud({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 60" className={className} style={style} aria-hidden="true">
      <path
        d="M28 52C14 52 8 42 12 34C14 26 22 22 30 24C32 12 44 6 56 9C66 11 72 18 74 26C80 20 92 20 98 28C110 28 116 40 110 48C108 51 104 52 100 52Z"
        fill="var(--c-cloud)"
      />
    </svg>
  )
}
