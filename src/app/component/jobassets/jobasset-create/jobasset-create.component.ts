
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IJobasset } from 'src/app/shared/models/jobassets';
import { JobassetsService } from '../jobassets.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CustomersService } from '../../customers/customers.service';
import { ICustomer } from "src/app/shared/models/customers";
@Component({
  selector: 'app-jobasset-create',
  templateUrl: './jobasset-create.component.html',
  styleUrls: ['./jobasset-create.component.scss']
})
export class JobassetCreateComponent implements OnInit {
  customers: ICustomer[];
  [x: string]: any;
  title: string;
  jobasset: IJobasset;
  closeResult: string;
  jobassetForm!: FormGroup;
  JobassetID?: number;
  isSubmitted = false;
  constructor(
    private customerService: CustomersService,
    public modal: NgbActiveModal,
    private jobassetService: JobassetsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.jobasset = {} as IJobasset;
  }

  ngOnInit(): void {
    this.jobassetForm = new FormGroup({
      customerId: new FormControl(this.jobasset.customerId, [
        Validators.required
      ]),
      name: new FormControl(this.jobasset.name, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(25),
      ]),

      code: new FormControl(this.jobasset.code, [
        Validators.maxLength(20),
      ]),

      type: new FormControl(this.jobasset.type, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
    this.loadData();

    this.loadCustomers();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.jobassetForm.controls;
  }

  loadData() {

    this.title = "Add new ";

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

  get customerId() {
    return this.jobassetForm.get('customerId')!;
  }

  get name() {
    return this.jobassetForm.get('name')!;
  }
  get code() {
    return this.jobassetForm.get('code')!;
  }
  get type() {
    return this.jobassetForm.get('type')!;
  }

  addNewJobasset() {

    if (this.jobassetForm.invalid || this.isSubmitted) {
      for (const control of Object.keys(this.jobassetForm.controls)) {
        this.jobassetForm.controls[control].markAsTouched();
      }
      return;
    }
    this.isSubmitted = true;
    this.jobassetService.createJobasset
      (this.jobassetForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Job Asset has been created',
          showConfirmButton: false,
          timer: 1500
        })


        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/jobassets/jobassets-list']);
        });

      }, error => {
        this.isSubmitted = false;
      });
    this.jobassetForm.reset();
  }



  open(content: any) {
    this.modalService.open(content, { size: 'xl', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  // Choose city using select dropdown
  changeCustomer(e) {
    
    this.customerId.setValue(e.target.value, {
      onlySelf: true
    })
  }



}
