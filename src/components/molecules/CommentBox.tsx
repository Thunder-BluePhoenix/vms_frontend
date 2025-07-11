import React, { ReactNode } from "react";
import { Button } from "@/src/components/atoms/button";
import { X } from 'lucide-react'
import { cn } from "@/lib/utils";
type props = {
  handleClose: () => void;
  handleComment: (value: string) => void;
  Submitbutton: () => void;
  children?: ReactNode;
  className?:string;
}

const Comment_box = ({ handleClose, handleComment, Submitbutton, children,className }: props) => {
  return (
    // <div className="absolute z-50 flex pt-10 items-center justify-center bg-black bg-opacity-50">
    <div className={cn(`bg-white rounded-xl border p-7 md:max-w-[650px] md:max-h-[350px] h-full w-full gap-8 text-black md:text-md font-light flex flex-col items-center justify-center`,className)}>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-poppins">Comments</h1>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer "
          onClick={handleClose}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      <textarea onChange={(e) => handleComment(e.target.value)} className="h-full w-full max-w-[80%] border-2 rounded-lg p-4 md:max-h-40"
      />
      {children}
      <div className="flex justify-end pt-5 gap-4 w-full">
        <Button className="bg-white text-black border text-xs font-normal px-8 rounded-md hover:bg-white" onClick={handleClose}>
          Back
        </Button>
        <Button className={`text-white text-sm font-normal border px-4`} onClick={() => Submitbutton()}>
          Submit
        </Button>
      </div>
    </div>
    // </div >
  );
};

export default Comment_box;
