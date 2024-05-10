'use client';

import Image from 'next/image';
import {IPlan} from '@/common/entities';
import {ColumnDef} from '@tanstack/react-table';

import {DataTableColumnHeader} from '@/common/components/table-pagination/data-table-column-header';
import {DataTableRowActions} from '@/common/components/table-pagination/data-table-row-actions';

import {format12Hour, formatVNDate} from '@/common/utils';

import {formatPlanStatus} from '../../utils';

export const columns: ColumnDef<IPlan>[] = [
  {
    accessorKey: 'index',
    header: ({column}) => <DataTableColumnHeader column={column} title="STT" />,
    cell: ({row}) => <div className="w-[20px]">{row.index + 1}</div>,
    enableSorting: false
  },
  {
    accessorKey: 'imageUrl',
    header: ({column}) => <DataTableColumnHeader column={column} title="Hình ảnh" />,
    cell: ({row}) => (
      <div className="w-[80px]">
        <Image
          className="rounded-lg"
          src={row.getValue('imageUrl')}
          width={60}
          height={60}
          alt={row.getValue('title')}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'address',
    header: ({column}) => <DataTableColumnHeader column={column} title="Điểm đến" />,
    cell: ({row}) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{row.getValue('address')}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'startAt',
    header: ({column}) => <DataTableColumnHeader column={column} title="Ngày" />,
    cell: ({row}) => {
      return (
        <div className="flex items-center">
          <span>{formatVNDate(row.getValue('startAt'))}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'startAt',
    header: ({column}) => <DataTableColumnHeader column={column} title="Thời gian" />,
    cell: ({row}) => {
      return (
        <div className="flex items-center">
          <span>{format12Hour(row.getValue('startAt'))}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: ({column}) => <DataTableColumnHeader column={column} title="Tình trạng" />,
    cell: ({row}) => {
      return (
        <div className="flex w-fit items-center rounded-lg bg-blue-400 px-3 py-[6px]">
          <span>{formatPlanStatus(row.getValue('status'))}</span>
        </div>
      );
    },
    enableSorting: false
  },
  {
    id: 'actions',
    cell: ({row}) => <DataTableRowActions row={row} />
  }
];
