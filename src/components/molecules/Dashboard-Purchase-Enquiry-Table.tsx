"use client"
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/atoms/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/atoms/select";
import { tableData } from "@/src/constants/dashboardTableData";
import { Input } from "../atoms/input";
import { DashboardTableType, TPRInquiryTable } from "@/src/types/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { log } from "console";
import { useAuth } from "@/src/context/AuthContext";

type Props = {
  dashboardTableData?: TPRInquiryTable["cart_details"]
  companyDropdown: { name: string }[]
}

const DashboardPurchaseInquiryVendorsTable = ({ dashboardTableData, companyDropdown }: Props) => {

  console.log("DashboardTableData PPRRRPRR--->", dashboardTableData);
  const { designation } = useAuth();

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const user = Cookies?.get("user_id");
  return (

    <div className="shadow- bg-[#f6f6f7] p-4 rounded-2xl">
      <div className="flex w-full justify-between pb-4">
        <h1 className="text-[20px] text-[#03111F] font-semibold">
          Purchase Inquiry
        </h1>
        <div className="flex gap-4">
          <Input placeholder="Search..." />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="w-full">
                {
                  companyDropdown?.map((item, index) => (
                    <SelectItem key={index} value={item?.name}>{item?.name}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-y-scroll max-h-[55vh]">
        <Table className="">
          <TableHeader className="text-center">
            <TableRow className="bg-[#DDE8FE] text-[#2568EF] text-[14px] hover:bg-[#DDE8FE] text-center">
              <TableHead className="">Sr No.</TableHead>
              <TableHead className="text-center">Ref No.</TableHead>
              <TableHead className="text-center">Cart Date</TableHead>
              {designation !== "Enquirer" && (
                <TableHead className="text-center">Created By</TableHead>
              )}

              <TableHead className="text-center">Transfer Status</TableHead>
              <TableHead className="text-center">Category Type</TableHead>
              <TableHead className="text-center">Purchase Request Type</TableHead>
              <TableHead className="text-center">Purchase Team Status</TableHead>
              <TableHead className="text-center">HOD Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
              <TableHead className={`text-center`}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-center">
            {dashboardTableData ? (
              dashboardTableData?.map((item, index) => {
                const url = item?.asked_to_modify ? `/pr-inquiry?refno=${item?.name}` : `/view-pr-inquiry?refno=${item?.name}`;
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-center">{index + 1}</TableCell>
                    <TableCell className="text-nowrap text-center">{item?.name}</TableCell>
                    <TableCell className="text-nowrap text-center">{item?.cart_date ? formatDate(new Date(item.cart_date)) : "-"}</TableCell>
                    {designation !== "Enquirer" && (
                      <TableCell className="text-nowrap text-center">{item?.user}</TableCell>
                    )}
                    <TableCell className="text-nowrap text-center">{item?.transfer_status}</TableCell>
                    <TableCell className="text-nowrap text-center">{item?.category_type}</TableCell>
                    <TableCell className="text-nowrap text-center">{item?.purchase_type}</TableCell>
                    <TableCell className="text-nowrap text-center">{item?.purchase_team_approval_status}</TableCell>
                    <TableCell className="text-nowrap text-center">{item?.hod_approval_status}</TableCell>
                    <TableCell className="text-nowrap text-center"><Link href={url}><Button className="bg-white text-black hover:bg-white hover:text-black">View</Button></Link></TableCell>
                    <TableCell className={`text-nowrap text-center ${item?.hod_approved && item?.purchase_team_approved && item?.user == user ? "" : "hidden"}`}><Link href={`/pr-request?cart_Id=${item?.name}`}><Button className="bg-blue-400 hover:bg-blue-400">PR</Button></Link></TableCell>
                    {/* <TableCell>
                  <div
                    className={`px-2 py-3 rounded-xl ${item?.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : item?.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                  >
                    {item?.status}
                  </div>
                </TableCell>
                <TableCell>{item?.purchase_team}</TableCell>
                <TableCell>{item?.purchase_head}</TableCell>
                <TableCell>{item?.accounts_team}</TableCell>
                <TableCell><Link href={`/vendor-details-form?tabtype=Certificate&vendor_onboarding=${item?.name}&refno=${item?.ref_no}`}><Button variant={"outline"}>View</Button></Link></TableCell>
                <TableCell className="text-right">{item?.qms_form}</TableCell> */}
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-gray-500 py-4">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </div>
    </div>
  );
};

export default DashboardPurchaseInquiryVendorsTable;
