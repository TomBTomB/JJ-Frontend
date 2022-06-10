import React from 'react'

export type ErrorProps = {
  error: string
}

export const Error = ({error}: ErrorProps) => {
  return (
    <div>
      Error: {error}
    </div>
  )
}