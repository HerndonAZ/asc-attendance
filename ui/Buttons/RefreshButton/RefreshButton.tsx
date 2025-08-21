'use client';
import { Button } from '@/ui/ui/button';
import { IoRefresh } from 'react-icons/io5';

function RefreshButton({
  disabled,
  onClick
}: {
  disabled: boolean;
  onClick?: () => void;
}) {
  const refresh = () => {
    // onClick()
    window.location.reload();
  };
  return (
    <Button disabled={disabled} onClick={refresh} className="flex items-center gap-2 border-2 border-gray-200 dark:border-gray-800 bg-[#80298F] hover:bg-[#4d1b56]">
      <IoRefresh className="h-4 w-4" />
      Refresh
    </Button>
  );
}

export default RefreshButton;
