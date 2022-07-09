export type LoggedInCustomer = LoggedInCustomerObject | null

 interface LoggedInCustomerObject{
    id:number;
    firstName:string;
    lastName:string;
    isAdmin:boolean;
}

