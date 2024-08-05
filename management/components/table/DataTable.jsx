"use client";

import {
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DataTable = ({ columns, data }) => {
  const table = useReactTable({
    columns,
    data,
    initialState: { pageIndex: 0 },
    manualPagination: true,
    pageCount: Math.ceil(data.length / 10),
    pageSize: 10,
    getRowModel: getPaginationRowModel,
    getCoreRowModel: getCoreRowModel,
    prepareRow: ({ row }) => {
      row.getToggleRowExpandedProps = () => ({
        onClick: () => {
          // Toggle row expanded state
        },
      });
    },
    //...other options
  });
  return (
    <div className="data-table">
      <Table className="shad-table">
        <TableHeader className="bg-dark-200">
          <TableRow>
            {table.columns.map((column) => (
              <TableHeader key={column.id}>
                <TableSortLabel {...column.getSortByToggleProps()} />
                <TableCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableCell>
              </TableHeader>
            ))}
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};

export default DataTable;
