"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnFiltersState,
    getFilteredRowModel,
    SortingState,
    getSortedRowModel,
    getPaginationRowModel,
    VisibilityState,
    ColumnPinningState,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PinIcon, Columns3Icon, PinOffIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { columnHeaderTextStyle } from "@/lib/constants"
import { Modal } from "../modal/modal";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const [updatedData, setUpdatedData] = useState<TData[]>(data)

    const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
        left: [],
        right: [],
    });

    // const supabase = createClientComponentClient();

    const table = useReactTable({
        data: updatedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onColumnPinningChange: setColumnPinning,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            columnPinning,
        }
    })

    useEffect(() => {
        console.log("data: ", data)
    }, [data])


    return (
        <div>
            {/* wip create something like a popup */}
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
                <Modal test={`row.getColumn("email")`}/>
            </div>
            <div className="flex items-center py-4 gap-x-3">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm "
                />
                {/* <Button>
                    here
                </Button> */}

                <div className="flex-1">
                    <div className="flex items-center justify-end sm:gap-x-3 gap-x-1">
                        <div className="sm:hidden flex">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size={'icon'} variant="outline" className="ml-auto">
                                        <PinIcon width={20} height={20} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuCheckboxItem
                                        checked={columnPinning.left && columnPinning.left[0] === null}
                                        onCheckedChange={() => {
                                            setColumnPinning({
                                                left: []
                                            })
                                        }}
                                        className="bg-gray-900"
                                    >
                                        <div className="flex items-center gap-x-2">
                                            <PinOffIcon width={12} height={12} />
                                            <p>Clear Pin</p>
                                        </div>

                                    </DropdownMenuCheckboxItem>
                                    {table
                                        .getAllColumns()
                                        .filter(
                                            (column) => column.getCanHide()
                                        )
                                        .map((column) => {
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={column.id}
                                                    className="capitalize"
                                                    checked={column.id === (columnPinning.left && columnPinning.left[0])}
                                                    onCheckedChange={(value) => {
                                                        setColumnPinning({
                                                            left: [column.id]
                                                        })
                                                    }}
                                                >
                                                    {column.id}
                                                </DropdownMenuCheckboxItem>
                                            )
                                        })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div>
                            {/* Column Selector : Mobile */}
                            <div className="sm:hidden flex">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="ml-auto" size={'icon'}>
                                            <Columns3Icon width={20} height={20} />
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end">
                                        {table
                                            .getAllColumns()
                                            .filter(
                                                (column) => column.getCanHide()
                                            )
                                            .map((column) => {
                                                return (
                                                    <DropdownMenuCheckboxItem
                                                        key={column.id}
                                                        className="capitalize"
                                                        checked={column.getIsVisible()}
                                                        onCheckedChange={(value) =>
                                                            column.toggleVisibility(!!value)
                                                        }
                                                    >
                                                        {column.id}
                                                    </DropdownMenuCheckboxItem>
                                                )
                                            })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Column Selector : Non-Mobile */}
                            <div className="sm:flex hidden">
                                <DropdownMenu>

                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="ml-auto">
                                            Columns
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end">
                                        {table
                                            .getAllColumns()
                                            .filter(
                                                (column) => column.getCanHide()
                                            )
                                            .map((column) => {
                                                return (
                                                    <DropdownMenuCheckboxItem
                                                        key={column.id}
                                                        className="capitalize"
                                                        checked={column.getIsVisible()}
                                                        onCheckedChange={(value) =>
                                                            column.toggleVisibility(!!value)
                                                        }
                                                    >
                                                        {column.id}
                                                    </DropdownMenuCheckboxItem>
                                                )
                                            })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="border">
                <Table>
                    <TableHeader className="bg-gray-light">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => {
                                    return (
                                        <TableHead
                                            className={`
                                                ${columnHeaderTextStyle} 
                                                ${(columnPinning.left && columnPinning.left[0] === header.column.id) ? 'sticky left-0 z-10 bg-gray-700' : ''}`}
                                            key={header.id}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}

                                            {/* {console.log(header.column.id)} */}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="bg-gray-dark"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}
                                            className={`truncate whitespace-nowrap ${(columnPinning.left && columnPinning.left[0] === cell.column.id) ? 'sticky left-0 z-10 bg-gray-900 px-5 max-w-32' : 'max-w-40'}`}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
