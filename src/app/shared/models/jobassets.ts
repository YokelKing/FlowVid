export interface IJobasset {
    id: number;
   customerId: number,
   customerName:string,
   name:string,
   code:string,
    status: boolean,
    type: string,
    createdDate: Date,
    createdBy: string,
    modifyDate: Date,
    modifiedBy: string
}