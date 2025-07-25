'use client'
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../atoms/select";
import { CertificateAttachment, TcertificateCodeDropdown, VendorOnboardingResponse } from "@/src/types/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../atoms/table";
import API_END_POINTS from "@/src/services/apiEndPoints";
import requestWrapper from "@/src/services/apiCall";
import { AxiosResponse } from "axios";
import { CrossIcon, Trash, Trash2 } from "lucide-react";
import { it } from "node:test";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

interface Props {
  certificateCodeDropdown: TcertificateCodeDropdown["message"]["data"]["certificate_names"];
  ref_no: string,
  onboarding_ref_no: string
  OnboardingDetail: VendorOnboardingResponse["message"]["certificate_details_tab"]
}

type certificateData = {
  certificate_code: string,
  valid_till: string,
  file?: FileList
  fileDetail?: CertificateAttachment,
  name?: string
  certificate_attach?: CertificateAttachment
  others?: string
}

const Certificate = ({ certificateCodeDropdown, ref_no, onboarding_ref_no, OnboardingDetail }: Props) => {
  console.log(OnboardingDetail)
  const [certificateData, setCertificateData] = useState<Partial<certificateData>>({});
  const [multipleCertificateData, setMultipleCertificateData] = useState<certificateData[]>(OnboardingDetail);
  const [otherField, setOtherField] = useState<string>()
  const router = useRouter();

  const [isOtherField, setIsOtherField] = useState<boolean>(false);

  useEffect(() => {

  }, [multipleCertificateData])



  console.log(OnboardingDetail, "this is data of certificate")

  const fileInput = useRef<HTMLInputElement>(null);


  const handleSubmit = async () => {
    if (OnboardingDetail?.length < 1) {
      alert("Upload At Least 1 Certificate")
      return;
    }
    const url = API_END_POINTS?.certificateSubmit;
    const certificateSubmit: AxiosResponse = await requestWrapper({ url: url, data: { data: { onb_id: onboarding_ref_no, completed: 1 } }, method: "POST" })
    if (certificateSubmit?.status == 200) {
      router.push("/Success");
    }
  }

  const handleBack = () => {
    router.push(`/vendor-details-form?tabtype=Reputed%20Partners&vendor_onboarding=${onboarding_ref_no}&refno=${ref_no}`);
  };

  const handleAdd = async () => {
    const url = API_END_POINTS?.certificateSave;
    const formData = new FormData()
    formData.append("data", JSON.stringify({ ref_no: ref_no, vendor_onboarding: onboarding_ref_no, certificates: [certificateData] }))
    if (certificateData?.file) {
      formData.append("certificate_attach", certificateData.file[0])
    }
    console?.log(formData?.values)
    const certificateSubmit: AxiosResponse = await requestWrapper({ url: url, data: formData, method: "POST" })
    if (certificateSubmit?.status == 200) {
      console.log("Successfully submit")
    }
    setCertificateData({})
    if (fileInput?.current) {
      fileInput.current.value = ''
    }
    console.log("pushring")
    location.reload()
    // router.push(`/vendor-details-form?tabtype=Certificate&vendor_onboarding=${onboarding_ref_no}&refno=${ref_no}`);
    // tableFetch();
  }


  const tableFetch = async () => {
    const url = `${API_END_POINTS?.fetchDetails}?ref_no=${ref_no}&vendor_onboarding=${onboarding_ref_no}`;
    const fetchOnboardingDetailResponse: AxiosResponse = await requestWrapper({ url: url, method: "GET" });
    const OnboardingDetails: VendorOnboardingResponse["message"]["certificate_details_tab"] = fetchOnboardingDetailResponse?.status == 200 ? fetchOnboardingDetailResponse?.data?.message?.certificate_details_tab : "";
    console.log(OnboardingDetails, "this is after api")
    setMultipleCertificateData([]);
    OnboardingDetails?.map((item) => {
      setMultipleCertificateData((prev: any) => ([...prev, { certificate_code: item?.certificate_code, fileDetail: { file_name: item?.certificate_attach?.file_name, name: item?.certificate_attach?.name, url: item?.certificate_attach?.url }, valid_till: item?.valid_till, name: item?.name }]))
    })
  }

  const deleteRow = async (certificate_code: string) => {
    const url = `${API_END_POINTS?.deleteCertificate}?certificate_code=${certificate_code}&ref_no=${ref_no}&vendor_onboarding=${onboarding_ref_no}`
    const deleteResponse: AxiosResponse = await requestWrapper({ url: url, method: "POST" });
    if (deleteResponse?.status == 200) {
      setMultipleCertificateData([]);
      // tableFetch();
      location.reload()
    }
  }


  return (
    <div className="flex flex-col bg-white rounded-lg px-4 pb-4 max-h-[80vh] overflow-y-scroll w-full">
      <h1 className="border-b-2 pb-2 mb-4 sticky top-0 bg-white py-4 text-lg">
        Certificate Details
      </h1>
      <div className="grid grid-cols-3 gap-6 p-5">
        <div className="flex flex-col col-span-1">
          <h1 className="text-[12px] font-normal text-[#626973] pb-3">
            Certificate Name
          </h1>
          <Select
            value={certificateData?.certificate_code ?? ""}
            onValueChange={(value) => {
              setCertificateData((prev: any) => ({
                ...prev,
                certificate_code: value,
              }));
              setIsOtherField(value === "Others");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {certificateCodeDropdown?.map((item, index) => (
                  <SelectItem value={item?.name} key={index}>
                    {item?.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1">
          <h1 className="text-[12px] font-normal text-[#626973] pb-3">
            Valid Till
          </h1>
          <Input value={certificateData?.valid_till ?? ""} placeholder="" type="date" onChange={(e) => { setCertificateData((prev: any) => ({ ...prev, valid_till: e.target.value })) }} />
        </div>
        <div className="col-span-1">
          <h1 className="text-[12px] font-normal text-[#626973] pb-3">
            Upload Certificate File
          </h1>
          <Input ref={fileInput} placeholder="" type="file" onChange={(e) => { setCertificateData((prev: any) => ({ ...prev, file: e?.target?.files, fileDetail: { file_name: e?.target?.files != null ? e.target.files[0].name : "" } })) }} />
        </div>
        {certificateData?.certificate_code == "Others" &&
          <div className="col-span-1">
            <h1 className="text-[12px] font-normal text-[#626973] pb-3">
              Others
            </h1>
            <Input value={certificateData?.others ?? ""} onChange={(e) => { setCertificateData((prev: any) => ({ ...prev, others: e.target.value })) }} />
          </div>
        }
      </div>

      <div className={`flex justify-end pr-6 pb-6`}><Button className="bg-blue-400 hover:bg-blue-400" onClick={() => { handleAdd() }}>Add</Button></div>
      {multipleCertificateData?.length > 0 && (
        <div className="shadow- bg-[#f6f6f7] p-4 mb-4 rounded-2xl">
          <div className="flex w-full justify-between pb-4">
            <h1 className="text-[20px] text-[#03111F] font-semibold">
              Multiple Certificates
            </h1>
          </div>
          <Table className=" max-h-40 overflow-y-scroll">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader className="text-center">
              <TableRow className="bg-[#DDE8FE] text-[#2568EF] text-[14px] hover:bg-[#DDE8FE] text-center">
                <TableHead className="text-center">Sr No.</TableHead>
                <TableHead className="text-center">Company Code</TableHead>
                <TableHead className="text-center">Valid Till</TableHead>
                <TableHead className="text-center">File</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {multipleCertificateData?.map((item, index) => (

                <TableRow key={item?.name ? item?.name : ""}>
                  <TableCell className="font-medium text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">{item?.certificate_code}</TableCell>
                  <TableCell className="text-center">{item?.valid_till}</TableCell>
                  <TableCell className="text-center">{item?.certificate_attach?.file_name}</TableCell>
                  <TableCell className="flex justify-center items-center text-center"><Trash2 onClick={() => { deleteRow(item?.certificate_code ? item?.certificate_code : "") }} className=" text-red-400 cursor-pointer" /></TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </div>
      )}
      <div className="flex justify-end items-center space-x-3 p-2">
        <Button
          onClick={handleBack}
          variant="backbtn"
          size="backbtnsize"
        >
          Back
        </Button>

        <Button
          onClick={handleSubmit}
          variant="nextbtn"
          size="nextbtnsize"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Certificate;
