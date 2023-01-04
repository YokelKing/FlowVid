import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

import { Router, ActivatedRoute } from "@angular/router";
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { IJobasset } from "src/app/shared/models/jobassets";
import {JobassetsService} from "../jobassets.service"
import Swal from "sweetalert2/dist/sweetalert2.js";
import { CustomersService } from "../../customers/customers.service";
import { ICustomer } from "src/app/shared/models/customers";

@Component({
  selector: "app-jobasset-edit",
  templateUrl: "./jobasset-edit.component.html",
  styleUrls: ["./jobasset-edit.component.scss"],
})
export class JobassetEditComponent implements OnInit {
  customers: ICustomer[];
  title: string;
  jobasset: IJobasset;
  closeResult: string;
  editForm: FormGroup;
  JobassetID?: number;
  isSubmitted = false;
  constructor(
    private customerService: CustomersService,
    public modal: NgbActiveModal,
    private JobassetsService: JobassetsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setForm();
    this.loadCustomers();
  }

  get editFormData() {
    return this.editForm.controls;
  }



  loadCustomers() {
    this.customerService.getAllCustomers().subscribe(
      (result) => {
        this.customers = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editJobasset() {
    if (this.editForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;



    this.loadCustomers();
    this.JobassetsService
      .updateJobasset(this.jobasset.id, this.editForm.value)
      .subscribe(
        (x) => {
          this.isSubmitted = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Job Asset has been updated',
            showConfirmButton: false,
            timer: 1500
          })


          this.modal.close("Yes");
        },
        (error) => {
          this.isSubmitted = false;
        }
      );
    this.editForm.reset();
  }

  public setForm() {
    this.editForm = this.fb.group({
      id: [this.jobasset.id],
      customerId: [this.jobasset.customerId, Validators.required],
      name: [this.jobasset.name, Validators.required],
      code: [this.jobasset.code, ""],
      type: [this.jobasset.type, Validators.required],
     // status: [this.jobasset.status, Validators.required],

      
    });
  }

  // Choose city using select dropdown
  changeCustomer(e) {
    console.log(e.target.value)
    this.customerId.setValue(e.target.value, {
      onlySelf: true
    })
  }

   // Getter method to access formcontrols
   get customerId() {
    return this.editForm.get('customerId');
  }

}
