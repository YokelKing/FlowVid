import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/shared/models/customers';
import { CustomersService } from '../../customers.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {CustomerCreateComponent} from '../../customer-create/customer-create/customer-create.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
customers: ICustomer[];
public displayColumns: string[] = [ 'name', 'code','status', 'type','createdDate', 'action']

customer: ICustomer; 
closeResult: string;
editCustomerForm : FormGroup;
editCustomerID;
isSubmitted = false;

  constructor(private customerService : CustomersService,
    private modalService: NgbModal,
    private fb : FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
   
  
  ngOnInit(): void {
    //this.editSetForm(); 
    this.loadCustomers();
   
  }

get f(): {[key: string]: AbstractControl}{
  return this.editCustomerForm.controls;
}

loadCustomers(){
  this.customerService.getAllCustomers().subscribe(      
    result => {
      console.log(result)
      this.customers = result;
      //this.dataSource.data = result;
    
    }, error => {
      console.log(error);
    }
  )
}

editCustomer(data: ICustomer) : void {
  this.router.navigate([`customers/cust-create/${data.id}`]);
//const ref = this.modalService.open(CustomerCreateComponent,{centered:true}) ;


//ref.componentInstance.customer = data; 
//ref.result.then((yes) =>{
//console.log("Ok");
//this.loadCustomers();
//},(cancel) =>{
//console.log("Cancel")
//})
}
private editSetForm(){
  console.log(this.customer);
  this.editCustomerForm = this.fb.group({
    id:[0],    
    name: ['', Validators.required],
    code: ['']
  });
}

editCustomerById(id: any){
  this.customerService.getCustomerById(id).subscribe(
    data => {
      console.log(data);
      
      this.editCustomerForm.get('id')?.setValue(data.id);
      this.editCustomerForm.get('name')?.setValue(data.name);
      this.editCustomerForm.get('code')?.setValue(data.code);
    });
}
deleteCustomer(data: ICustomer) : void {
 
  this.customerService.deleteCustomer(data)
  .subscribe(
    (data) =>data,      
    err => console.log(data.name + "has not been deleted")
  );
  this.customers = this.customers.filter(r => r.id !== data.id)

}



  open(content) {
    this.modalService.open(content,
       {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
 
}
