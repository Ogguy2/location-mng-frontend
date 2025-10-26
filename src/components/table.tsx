import { Pencil, Trash } from "lucide-react";
import {
  TableHeader,
  TableRow,
  Table,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const DefaultTable = () => {
  const datas = [
    {
      invoice: "INV001",
      status: "Paid",
      method: "Credit Card",
      amount: "$250.00",
    },
    {
      invoice: "INV002",
      status: "Pending",
      method: "PayPal",
      amount: "$150.00",
    },
    {
      invoice: "INV003",
      status: "Overdue",
      method: "Bank Transfer",
      amount: "$300.00",
    },
    {
      invoice: "INV001",
      status: "Paid",
      method: "Credit Card",
      amount: "$250.00",
    },
    {
      invoice: "INV002",
      status: "Pending",
      method: "PayPal",
      amount: "$150.00",
    },
    {
      invoice: "INV003",
      status: "Overdue",
      method: "Bank Transfer",
      amount: "$300.00",
    },
    {
      invoice: "INV001",
      status: "Paid",
      method: "Credit Card",
      amount: "$250.00",
    },
    {
      invoice: "INV002",
      status: "Pending",
      method: "PayPal",
      amount: "$150.00",
    },
    {
      invoice: "INV003",
      status: "Overdue",
      method: "Bank Transfer",
      amount: "$300.00",
    },
  ];
  return (
    <Table className="w-full ">
      <TableHeader>
        <TableRow className="font-bold ">
          <TableHead className="font-bold">Invoice</TableHead>
          <TableHead className="font-bold">Status</TableHead>
          <TableHead className="font-bold">Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datas.map((data, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{data.invoice}</TableCell>
            <TableCell>{data.status}</TableCell>
            <TableCell>{data.method}</TableCell>
            <TableCell className="text-right">{data.amount}</TableCell>
            <TableCell className="text-right">
              <Button size={"lg"} variant={"ghost"}>
                <Pencil />
                Editer
              </Button>
              {/* Delete */}
              <Button size={"lg"} variant="destructive" className="ml-2">
                <Trash />
                Supprimer
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DefaultTable;