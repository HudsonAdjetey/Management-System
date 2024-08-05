"use client";
import React from "react";
import {
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import StatusBadge from "../StatusBadge";
import { FormatDateTime } from "@/lib/utils";
import dataInfo from "@/components/constants/dummy";
import Image from "next/image";
const DataTable = () => {
  const columns = [
    {
      header: "#",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.index + 1}</p>;
      },
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.firstName}</p>;
      },
    },

    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.lastName}</p>;
      },
    },
    // admission id
    {
      accessorKey: "admissionId",
      header: "Admission ID",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.admissionId}</p>;
      },
    },
    // status
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const rowStatus = row.original;
        return (
          <div className="min-w-[115px]">
            <StatusBadge status={rowStatus.status} />
          </div>
        );
      },
    },
    // date issued
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const rowItems = row.original;

        return (
          <p className="text-14-regular min-w-[100px]">
            {FormatDateTime(rowItems.createdAt).dateTime}
          </p>
        );
      },
    },
  ];

  const table = useReactTable({
    columns,
    data: dataInfo,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pageIndex: 0,
      pageSize: 10,
    },
  });

  return (
    <div className="data-table">
      <Table className="shad-table">
        <TableHeader className="bg-dark-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="shad-table-row-header">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                      header.isSorted,
                      header.isSortedDesc,
                      header.isSortedAsc
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "Selected"}
                className="shad-table-row hover:bg-[#1C2023] "
                onClick={() => {
                  console.log(row.id);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="shad-table-row">
              <TableCell colSpan={columns.length}>No data to display</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="table-actions">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="shad-gray-btn"
          variant="outline"
          size="sm"
        >
          <Image
            src={"/assets/Icons/arrowLeft.svg"}
            alt="arrow left icon"
            width={24}
            height={24}
          />
        </Button>
        <Button className="shad-gray-btn">
          <Image
            src={"/assets/Icons/arrowRight.svg"}
            alt="arrow right icon"
            width={24}
            height={24}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
