import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { ICustomer } from "src/app/shared/models/customers";
import { CustomersService } from "../../customers.service";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-customer-edit",
  templateUrl: "./customer-edit.component.html",
  styleUrls: ["./customer-edit.component.scss"],
})
export class CustomerEditComponent implements OnInit {
  title: string;
  customer: ICustomer;
  closeResult: string;
  editForm: FormGroup;
  customerID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private customerService: CustomersService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  get editFormData() {
    return this.editForm.controls;
  }

  editCustomer() {
    if (this.editForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.customerService
      .updateCustomer(this.customer.id, this.editForm.value)
      .subscribe(
        (x) => {
          this.isSubmitted = false;
          Swal.fire({  
            // position: 'top-end',  
             icon: 'success',  
             title: 'Customer has been updated',  
             showConfirmButton: false,  
             timer: 1500  
           })  
       

          this.modal.close("Yes");
        },
        (error) => {
          this.isSubmitted = false;
        }
      );
  }

  public setForm() {
    this.editForm = this.fb.group({
      id: [this.customer.id],
      name: [this.customer.name, Validators.required],
      code: [this.customer.code, ""],
    });
  }
}
