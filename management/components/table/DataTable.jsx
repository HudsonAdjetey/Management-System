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

const DataTable = () => {
  const data = [
    {
      firstName: "Tanner",
      lastName: "Linsley",
      age: 33,
      visits: 100,
      progress: 50,
      status: "Married",
    },
    {
      firstName: "Kevin",
      lastName: "Vandy",
      age: 27,
      visits: 200,
      progress: 100,
      status: "Single",
    },
  ];

  const columns = [
    {
      header: "First Name",
      accessorKey: "firstName",
    },
    {
      header: "Last Name",
      accessorKey: "lastName",
    },
    {
      header: "Age",
      accessorKey: "age",
    },
    {
      header: "Visits",
      accessorKey: "visits",
    },
    {
      header: "Progress",
      accessorKey: "progress",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
      </Table>
    </div>
  );
};

export default DataTable;
