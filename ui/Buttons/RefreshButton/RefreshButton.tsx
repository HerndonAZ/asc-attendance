'use client'
import { Button } from '@tremor/react'
import { IoRefresh } from 'react-icons/io5'

function RefreshButton({disabled, onClick} :{disabled: boolean, onClick: () => void}) {
    
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