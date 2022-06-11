import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import React, { useCallback } from 'react'

export type FollowActionsProps = {
  userId: string
  isFollowed: boolean
  onToggle: (userId: string) => void
}

export const FollowActions = ({userId, isFollowed, onToggle}: FollowActionsProps) => {
  const handleToggle = useCallback(() => onToggle(userId), [onToggle, userId])

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch sx={{m: 1}} defaultChecked/>}
        label={isFollowed ? 'Following' : 'Not following'}
        checked={isFollowed}
        onChange={handleToggle}
      />
    </FormGroup>
  )
}
