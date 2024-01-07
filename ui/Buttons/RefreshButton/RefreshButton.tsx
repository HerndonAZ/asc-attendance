'use client'
import { Button } from '@tremor/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoRefresh } from 'react-icons/io5'

function RefreshButton() {
    const router = useRouter()
    
    const refresh = () => {
        window.location.reload();
      };
  return (
    <Button icon={IoRefresh} onClick={refresh}>
    Refresh
  </Button>
  )
}

export default RefreshButton