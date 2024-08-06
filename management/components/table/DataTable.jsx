"use client";
import React, { useState } from "react";
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

import ReactPaginate from "react-paginate";

import StatusBadge from "../StatusBadge";
import { FormatDateTime } from "@/lib/utils";
import dataInfo from "@/components/constants/dummy";
import Image from "next/image";
import Columns from "@/components/table/columns";
const DataTable = () => {
  const columns = Columns(FormatDateTime, StatusBadge)
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
        <p className="font-normal text-sm text-gray-400">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        {/* NOT IGNORED  */}
        {/*   <PaginatedItems
          itemsPerPage={4}
          data={dataInfo}
          items={dataInfo?.length || 0}
        /> */}
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

// @desc -
// This component is used to render paginated items.
// Currently, it's not being used in the DataTable component.
// It's here for future reference or usage.
//
// @params - itemsPerPage: Number of items per page
//           data: Array of items to be paginated

/* function PaginatedItems({ items, data }) {
  // items offset
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data.slice(itemOffset, endOffset);
  let pageCount = data ? Math.ceil(items.length / itemsPerPage) : 1;

  const handlePageClick = (event) => {
    console.log("event ", event);
    const newOffset = (event.selected * itemsPerPage) % data?.length;
    console.log(newOffset);
    setItemOffset(newOffset);
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Number(pageCount)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
} */

export default DataTable;
