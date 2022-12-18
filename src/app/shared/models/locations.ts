export interface ILocation {
    id: number;
   customerId: number,
   customername:string,
   name:string,
   streetNumber:number,
   streetName:string,
   suburb:string,
   city:string,
   postCode:number,
   lon:string,
   lat:string,
   comment:string,
    status: boolean,
    type: string,
    createdDate: Date,
    createdBy: string,
    modifyDate: Date,
    modifiedBy: string
}