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
import { DashboardTableType, TvendorRegistrationDropdown } from "@/src/types/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type Props = {
  dashboardTableData?: DashboardTableType
  companyDropdown: TvendorRegistrationDropdown["message"]["data"]["company_master"]
}

const DashboardApprovedVendorsTable = ({ dashboardTableData, companyDropdown }: Props) => {
  console.log(dashboardTableData,"this is table onboarded")
  return (

    <div className="shadow- bg-[#f6f6f7] p-4 rounded-2xl">
      <div className="flex w-full justify-between pb-4">
        <h1 className="text-[20px] text-[#03111F] font-semibold">
          Total OnBoarded Vendors
        </h1>
        <div className="flex gap-4">
          <Input placeholder="Search..." />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="w-full">
                {
                  companyDropdown?.map((item, index) => (
                    <SelectItem key={index} value={item?.name}>{item?.description}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
        </div>
      </div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className="text-center">
          <TableRow className="bg-[#DDE8FE] text-[#2568EF] text-[14px] hover:bg-[#DDE8FE] text-center">
            <TableHead className="w-[100px]">Sr No.</TableHead>
            <TableHead>Ref No.</TableHead>
            <TableHead>Vendor Name</TableHead>
            <TableHead className="text-center">Company Name</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Vendor Code</TableHead>
            <TableHead className="text-center">Country</TableHead>
            <TableHead className="text-center">Register By</TableHead>
            <TableHead className="text-center">View Details</TableHead>
            <TableHead className="text-center">QMS Form</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {dashboardTableData?.approved_vendor_onboarding && dashboardTableData.approved_vendor_onboarding.length > 0 ? (
            dashboardTableData.approved_vendor_onboarding.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}.</TableCell>
                <TableCell className="text-nowrap">{item?.name}</TableCell>
                <TableCell className="text-nowrap">{item?.vendor_name}</TableCell>
                <TableCell className="text-nowrap">{item?.company_name}</TableCell>
                <TableCell>
                  <div
                    className={`px-2 py-3 rounded-xl uppercase ${item?.onboarding_form_status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : item?.onboarding_form_status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                      }`}
                  >
                    {item?.onboarding_form_status}
                  </div>
                </TableCell>
                <TableCell>{item?.vendor_code ? item?.vendor_code : "-"}</TableCell>
                <TableCell>{item?.country}</TableCell>
                <TableCell>{item?.register_by}</TableCell>
                <TableCell><Link href={`/view-onboarding-details?tabtype=Certificate&vendor_onboarding=${item?.name}&refno=${item?.ref_no}`}><Button variant={"outline"}>View</Button></Link></TableCell>
                <TableCell><Link href={`/qms-details?tabtype=vendor%20information&vendor_onboarding=${item?.name}`}><Button variant={"outline"}>View</Button></Link></TableCell>
              </TableRow>
            ))
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
  );
};

export default DashboardApprovedVendorsTable;
