'use client'
import { Button } from '@tremor/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoRefresh } from 'react-icons/io5'

function RefreshButton({disabled, onClick} :{disabled: boolean, onClick: () => void}) {
    const router = useRouter()
    
    const refresh = () => {
      onClick()
        window.location.reload();
      };
  return (
    <Button disabled={disabled} icon={IoRefresh} onClick={refresh}>
    Refresh
  </Button>
  )
}

export default RefreshButton