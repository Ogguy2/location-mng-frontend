import { Pencil, Trash } from "lucide-react";
import {
  TableHeader,
  TableRow,
  Table,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface DefaultTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  datasTable: TData[];
  rowRoute: (idValue: string | number) => string;
}

const DefaultTable = <TData, TValue>({
  columns,
  datasTable,
  rowRoute,
}: DefaultTableProps<TData, TValue>) => {
  const [data, setDatasTable] = React.useState<TData[]>(datasTable);
  React.useEffect(() => {
    setDatasTable(datasTable);
  }, [datasTable]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const router = useRouter();
  return (
    <Table className="w-full ">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  className={clsx(
                    header.column.id == "action" && "sr-only",
                    "font-bold "
                  )}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
              className="hover:cursor-pointer"
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  onClick={() => {
                    if (cell.column.id !== "action") {
                      const link = rowRoute(
                        row.original["id"] as string | number
                      );
                      router.push(link);
                    }
                  }}
                  key={cell.id}
                >
                  {JSON.stringify(cell.column.columnDef.cell)}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <SkeletonRow length={columns.length} />
        )}
      </TableBody>
    </Table>
  );
};

export default DefaultTable;

interface SkeletonRowProps {
  length: number;
}
const SkeletonRow = ({ length }: SkeletonRowProps) => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <TableRow key={index}>
            <TableCell colSpan={length} className=" text-center">
              <Skeleton className="h-[20px] w-full rounded" />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};
