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

    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      code: ['']
    });
    this.loadData();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  loadData() {

    this.title = "Add new ";

  }


  addNewCustomer() {

    if (this.customerForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.customerService.createCutsomer
      (this.customerForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Customer has been created',
          showConfirmButton: false,
          timer: 1500
        })


        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/customers/cust-list']);
        });

      }, error => {
        this.isSubmitted = false;
      });
    this.customerForm.reset();
  }



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

}
