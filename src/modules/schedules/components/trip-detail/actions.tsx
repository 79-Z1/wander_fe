'use client';

import {useRouter} from 'next/navigation';
import {IPlan} from '@/common/entities';
import {DotsHorizontalIcon} from '@radix-ui/react-icons';
import {Row} from '@tanstack/react-table';

import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({row}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const plan = row.original as IPlan;

  function onMapPosition() {
    if (!plan?.location?.lat || !plan?.location?.lng) return;
    router.push(`/map/?lat=${plan.location.lat}&lng=${plan.location.lng}&address=${plan.address}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[160px]">
        <DropdownMenuItem className="cursor-pointer" onClick={onMapPosition}>
          Xem vị trí
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
