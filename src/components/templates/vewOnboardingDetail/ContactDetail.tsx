'use client'
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../atoms/select";
import { Input } from "../../atoms/input";
import { SelectContent } from "../../atoms/select";
import { useContactDetailStore,TcontactDetail } from "@/src/store/ContactDetailStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../atoms/table";
import { Button } from "@/components/ui/button";
import API_END_POINTS from "@/src/services/apiEndPoints";
import requestWrapper from "@/src/services/apiCall";
import { AxiosResponse } from "axios";
import { VendorOnboardingResponse } from "@/src/types/types";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

type Props = {
  ref_no:string,
  onboarding_ref_no:string
  OnboardingDetail:VendorOnboardingResponse["message"]["contact_details_tab"]
}

const ContactDetail = ({ref_no,onboarding_ref_no,OnboardingDetail}:Props) => {
  const {contactDetail,addContactDetail,resetContactDetail} = useContactDetailStore()
  const [contact,setContact] = useState<Partial<TcontactDetail>>()
  const router = useRouter();
  useEffect(()=>{
    resetContactDetail();
    OnboardingDetail?.map((item,index)=>{
      addContactDetail(item)
    })
  },[])
  const {designation} = useAuth();

  // if(!designation){
  //   return(
  //     <div>Loading...</div>
  //   )
  // }
  



  const handleAdd = ()=>{
    addContactDetail(contact)
    setContact({});
  }

  const handleSubmit = async()=>{
    const submitUrl = API_END_POINTS?.contactDetailSubmit;
    const submitResponse:AxiosResponse = await requestWrapper({url:submitUrl,data:{data:{contact_details:contactDetail,ref_no:ref_no,vendor_onboarding:onboarding_ref_no}},method:"POST"});
    if(submitResponse?.status == 200) router.push(`/vendor-details-form?tabtype=Manufacturing%20Detail&vendor_onboarding=${onboarding_ref_no}&refno=${ref_no}`);
  }

  return (
    <div className="flex flex-col bg-white rounded-lg px-4 pb-4 max-h-[80vh] overflow-y-scroll w-full">
      <h1 className="border-b-2 pb-2 mb-4 sticky top-0 bg-white py-4 text-lg">
        Contact Detail
      </h1>
      <div className="shadow- bg-[#f6f6f7] p-4 mb-4 rounded-2xl">
            <div className="flex w-full justify-between pb-4">
              <h1 className="text-[20px] text-[#03111F] font-semibold">
                Multiple Contact
              </h1>
            </div>
            <Table className=" max-h-40 overflow-y-scroll">
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader className="text-center">
                <TableRow className="bg-[#DDE8FE] text-[#2568EF] text-[14px] hover:bg-[#DDE8FE] text-center">
                  <TableHead className="w-[100px]">Sr No.</TableHead>
                  <TableHead className="text-center">First Name</TableHead>
                  <TableHead className="text-center">Last Name</TableHead>
                  <TableHead className="text-center">Designation</TableHead>
                  <TableHead className="text-center">Email</TableHead>
                  <TableHead className="text-center">Contact Number</TableHead>
                  <TableHead className="text-center">Department Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                {contactDetail?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index +1}</TableCell>
                    <TableCell>{item?.first_name}</TableCell>
                    <TableCell>{item?.last_name}</TableCell>
                    <TableCell>{item?.designation}</TableCell>
                    <TableCell>
                      {item?.email}
                    </TableCell>
                    <TableCell>{item?.contact_number}</TableCell>
                    <TableCell>{item?.department_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* <div className={`flex justify-end pr-4 ${designation?"hidden":""}`}><Button onClick={()=>{handleSubmit()}}>Next</Button></div> */}
    </div>
  );
};
export default ContactDetail
