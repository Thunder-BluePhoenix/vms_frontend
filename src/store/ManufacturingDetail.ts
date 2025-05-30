import { create } from 'zustand';

export type ManufacturingDetail = {
    total_godown:string,
    storage_capacity:string,
    spare_capacity:string,
    type_of_premises:string,
    working_hours:string,
    weekly_holidays:string,
    number_of_manpower:string,
    annual_revenue:string,
    cold_storage:number,
    material_description:string,
    hsnsac_code:string,
    annual_capacity:string,
}


type TmanufacturingDetailStore = {
    ManufacturingDetail:Partial<ManufacturingDetail>;
    updateManufacturingDetail:(field: keyof ManufacturingDetail, value:any)=>void
    resetForm:()=>void;
}

export const useManufacturingDetailStore = create<TmanufacturingDetailStore>((set)=>({
    ManufacturingDetail:{},
    updateManufacturingDetail(field,value){
        set((state)=>({
            ManufacturingDetail:{
                ...state?.ManufacturingDetail,
                [field]:value
            }
        }))
    },

    resetForm:()=>set({ManufacturingDetail:{}})

    }))