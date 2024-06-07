'use client';

import * as React from 'react';
import {ArrowUpDown, ChevronDown, MoreHorizontal} from 'lucide-react';
import AdminApi from '@/common/api/admin.api';
import {IUser, UserRole} from '@/common/entities/user.entity';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {useToast} from '@/components/ui/use-toast';
import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

type TUserTableProps = IComponentBaseProps & {
  users: IUser[];
  onEdit?: (status: boolean) => void;
};

const UserTable: React.FC<TUserTableProps> = ({className, users, onEdit}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const {toast} = useToast();

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: 'email',
      header: ({column}) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({row}) => <div>{row.getValue('email')}</div>
    },
    {
      accessorKey: 'name',
      header: () => <div className="">Tên</div>,
      cell: ({row}) => <div className="lowercase">{row.getValue('name')}</div>
    },
    {
      accessorKey: 'isActive',
      header: () => <div className="">Trạng thái</div>,
      cell: ({row}) => {
        async function handleChange(value: string) {
          const defaulRole: string = row.getValue('isActive') ? 'true' : 'false';

          if (defaulRole === value) return;
          await AdminApi.updateUser({...row.original, isActive: value === 'true'});
          toast({
            variant: 'success',
            description: `Cập nhật trạng thái cho ${row.getValue('name')} thành công`,
            duration: 3000
          });
          onEdit?.(true);
        }
        return (
          <div className="lowercase">
            <Select defaultValue={row.getValue('isActive')?.toString()} onValueChange={handleChange}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="true">Kích hoạt</SelectItem>
                  <SelectItem value="false">Ngưng kích hoạt</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );
      }
    },
    {
      accessorKey: 'role',
      header: () => <div className="">Quyền</div>,
      cell: ({row}) => {
        const defaulRole: string = row.getValue('role');
        async function handleChange(value: UserRole) {
          if (defaulRole === value) return;
          await AdminApi.updateUser({...row.original, role: value});
          toast({
            variant: 'success',
            description: `Cập nhật quyền cho ${row.getValue('name')} thành công`,
            duration: 3000
          });
          onEdit?.(true);
        }

        return (
          <div className="lowercase">
            <Select defaultValue={defaulRole} onValueChange={handleChange}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Quyền" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="user">Người dùng</SelectItem>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({row}) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem className="text-center" onClick={() => navigator.clipboard.writeText(user._id || '')}>
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  return (
    <div className={cn('AdminUserTable', className)} data-testid="AdminUserTable">
      <div className="flex items-center py-4">
        <Input
          placeholder="Tìm kiếm bằng email..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('email')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Không có kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trước
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
