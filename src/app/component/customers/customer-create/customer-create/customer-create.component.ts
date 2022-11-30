import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICustomer } from 'src/app/shared/models/customers';
import { CustomersService } from '../../customers.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {
  //@ViewChild('myModal', { static: false }) myModal;

  [x: string]: any;
  title: string;
  customer: ICustomer;
  closeResult: string;
  customerForm: FormGroup;
  customerID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private customerService: CustomersService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //this.setForm();

    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      code: ['']
    });
    this.loadData();
    // this.activatedRoute.paramMap.subscribe(p =>{
    //   this.customerID = +p.get('id');
    //  this.getCustomerById(this.customerID);
    //  });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  loadData() {
    //  //retreive ID 
    //   this.customerID = +this.activatedRoute.snapshot.paramMap.get('customerID');
    // if(this.customerID){
    //   //fetch the customer from the server
    //   this.customerService.getCustomerById(this.customerID).
    //       subscribe( data => {
    //         this.customer = data;
    //         this.title = "Edit -" + this.customer.name;
    //         this.customerForm.patchValue(this.customer);

    //       }, error => console.error(error)
    //       )
    // }
    // else{
    this.title = "Add new ";
    //}
  }

  // private getCustomerById(id ){ 
  //   if(id !== 0){
  //     this.customerService.getCustomerById(id).
  //     subscribe( data => {
  //       this.customer = data;
  //       this.customerForm.patchValue(this.customer);
  //     }, error => console.error(error)
  //     )
  //   }
  // }

  // SaveCustomer(): void {
  //   this.isSubmitted = true;
  //   // var cust = (this.customerID) ? this.customer : <ICustomer>{};
  //   // cust.name = this.customerForm.get("name").value;
  //   // cust.code =  this.customerForm.get("code").value;

  //   // if(this.CustomerForm.invalid){
  //   //   return;
  //   //    }
  //     // if(this.customerID === 0 )
  //     // {
  //       this.addNewCustomer();       

  //     // }
  //     // else { 
  //     //   this.editCustomer();
  //     //  }
  //       this.customerForm.reset();
  // }

  addNewCustomer() {

    if (this.customerForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.customerService.createCutsomer
      (this.customerForm.value)
      .subscribe(data => {
        //console.log(" Customer " + data.id + "has been created");  
        ///Swal.fire('Customer has been created');


        Swal.fire({  
         // position: 'top-end',  
          icon: 'success',  
          title: 'Customer has been created',  
          showConfirmButton: false,  
          timer: 1500  
        })  
    
        
        this.isSubmitted = false;
        // this.modal.close('Yes');
        this.modalService.dismissAll();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/customers/cust-list']);
        });

      }, error => {
        this.isSubmitted = false;
      });

  }



  // this.customerService.updateCustomer(this.customer.id,this.editForm.value).subscribe(x => {
  //   this.isSubmitted = false;
  //   this.modal.close('Yes');
  // }


  // private editCustomer(): void {
  //   this.customerService.updateCustomer(this.customerID,
  //      this.customerForm.value).
  //   subscribe( (result) => {
  //     console.log("Customer"+ result.name +"has been updated");
  //     //alert("Customer has been updated");
  //     Swal.fire('Customer has been updated');

  //   //  this.router.navigate(['/customers/cust-list']);

  //     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
  //       this.router.navigate(['/customers/cust-list']);
  //   });
  //   //  this.customerForm.reset();
  //   }, error => console.log(error))
  //   this.modalService.dismissAll();
  // }


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  // private setForm() {
  //   // this.customerService.getCustomerById(id).subscribe(x => {
  //   //   this.customer = x
  //     this.customerForm = this.fb.group({
  //       id: [this.customer.id],
  //       name: [this.customer.name, Validators.required],
  //       code: [this.customer.code, Validators.required],
  //     });

  //  // });


  // }




}
