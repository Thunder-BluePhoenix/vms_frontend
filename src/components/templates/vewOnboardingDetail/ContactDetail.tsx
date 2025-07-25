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
  const [isDisabled,setIsDisabled] = useState<boolean>(true);
  const [contact,setContact] = useState<Partial<TcontactDetail>>()
  const {designation} = useAuth();
  const router = useRouter();
  useEffect(()=>{
    resetContactDetail();
    OnboardingDetail?.map((item,index)=>{
      addContactDetail(item)
    })
  },[])




  const handleAdd = ()=>{
    addContactDetail(contact)
    setContact({});
  }

  const handleRowDelete = (index: number) => {
    // Remove the contact at the given index from the contactDetail store
    const updatedContacts = contactDetail.filter((_, itemIndex) => itemIndex !== index);
    resetContactDetail();
    updatedContacts.forEach(item => addContactDetail(item));
  }

  const handleSubmit = async()=>{
    // if(contactDetail?.length < 1){
    //   alert("Please Enter At Least 1 Contact Details")
    //   return;
    // }
    const submitUrl = API_END_POINTS?.contactDetailSubmit;
    const submitResponse:AxiosResponse = await requestWrapper({url:submitUrl,data:{data:{contact_details:contactDetail,ref_no:ref_no,vendor_onboarding:onboarding_ref_no}},method:"POST"});
    if(submitResponse?.status == 200) router.push(`${designation == "Purchase Team" || designation == "Purchase Head"?`/view-onboarding-details?tabtype=Payment%20Detail%20%2F%20Bank%20Detail&vendor_onboarding=${onboarding_ref_no}&refno=${ref_no}`:`/view-onboarding-details?tabtype=Manufacturing%20Detail&vendor_onboarding=${onboarding_ref_no}&refno=${ref_no}`}`);
  }

  return (
    <div className="flex flex-col bg-white rounded-lg px-4 pb-4 max-h-[80vh] overflow-y-scroll w-full">
      <div className="flex justify-between">
      <h1 className="border-b-2 pb-2">Contact Detail</h1>
      <Button onClick={()=>{setIsDisabled(prev=>!prev)}} className="mb-2">{isDisabled?"Enable Edit":"Disable Edit"}</Button>
      </div>
      <h1 className="pl-5">Contact Person</h1>
      <div className="grid grid-cols-3 gap-6 p-5">
        <div className="col-span-1">
          <h1 className="text-[12px] font-normal text-[#626973] pb-3">
            First Name
          </h1>
          <Input disabled={isDisabled} className="disabled:opacity-100" placeholder="" onChange={(e)=>{setContact((prev: any)=>({...prev,first_name:e.target.value}))}} value={contact?.first_name ?? ""} />
        </div>
        <div className="col-span-1">
          <h1 className="text-[12px] font-normal text-[#626973] pb-3">
            Last Name
          </h1>
          <Input disabled={isDisabled} className="disabled:opacity-100" placeholder="" onChange={(e)=>{setContact((prev:any)=>({...prev,last_name:e.target.value}))}} value={contact?.last_name ?? ""}/>
        </div>
        <div className="col-span-1">
          <h1 className="text-[12px] font-normal text-[#626973] pb-3">
            Designation
          </h1>
          <Input className="disabled:opacity-100" disabled={isDisabled} placeholder="" onChange={(e)=>{setContact((prev:any)=>({...prev,designation:e.target.value}))}} value={contact?.designation ?? ""}/>
        </div>
        <div className="col-span-1">
          <h1 className="text-[12px] font-normal text-[#626973] pb-3">Email</h1>
          <Input disabled={isDisabled} className="disabled:opacity-100" placeholder="" onChange={(e)=>{setContact((prev:any)=>({...prev,email:e.target.value}))}} value={contact?.email ?? ""}/>
        </div>
        <div className="col-span-1">
          <h1 className="text-[12px] font-normal text-[#626973] pb-3">
            Contact Number
          </h1>
          <Input disabled={isDisabled} className="disabled:opacity-100" placeholder="" onChange={(e)=>{setContact((prev:any)=>({...prev,contact_number:e.target.value}))}} value={contact?.contact_number ?? ""}/>
        </div>
        <div className="col-span-1">
          <h1 className="text-[12px] font-normal text-[#626973] pb-3">
            Department Name
          </h1>
          <Input disabled={isDisabled} className="disabled:opacity-100" placeholder="" onChange={(e)=>{setContact((prev:any)=>({...prev,department_name:e.target.value}))}} value={contact?.department_name ?? ""}/>
        </div>
      </div>
      <div className={`flex justify-end pb-4`}>
        <Button className={`bg-blue-400 hover:bg-blue-400 ${isDisabled?"hidden":""}`} onClick={()=>{handleAdd()}}>Add</Button>
      </div>
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
                  <TableHead className="text-center">Delete</TableHead>
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
                    <TableCell><Button className={`${isDisabled?"hidden":""}`} onClick={()=>{handleRowDelete(index)}}>Delete</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className={`flex justify-end pr-4 ${isDisabled?"hidden":""}`}><Button onClick={()=>{handleSubmit()}}>Next</Button></div>
    </div>
  );
};
export default ContactDetail
