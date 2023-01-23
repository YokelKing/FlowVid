
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ILocation } from 'src/app/shared/models/locations';
import { LocationsService } from '../locations.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CustomersService } from '../../customers/customers.service';
import { ICustomer } from "src/app/shared/models/customers";
@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.scss']
})
export class LocationCreateComponent implements OnInit {
  customers: ICustomer[];
  [x: string]: any;
  title: string;
  location: ILocation;
  closeResult: string;
  locationForm!: FormGroup;
  LocationID?: number;
  isSubmitted = false;
  constructor(
    private customerService: CustomersService,
    public modal: NgbActiveModal,
    private locationService: LocationsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.location = {} as ILocation;
  }

  ngOnInit(): void {
    this.locationForm = new FormGroup({
      customerId: new FormControl(this.location.customerId, [
        Validators.required
      ]),
      name: new FormControl(this.location.name, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(25),
      ]),

      streetNumber: new FormControl(this.location.streetNumber, [
        Validators.required
      ]),

      streetName: new FormControl(this.location.streetName, [
        Validators.required
      ]),

      suburb: new FormControl(this.location.suburb, [
        Validators.required
      ]),

      city: new FormControl(this.location.city, [
        Validators.required
      ]),
      postCode: new FormControl(this.location.postCode, [
        Validators.required
      ]),
      lon: new FormControl(this.location.lon, [
        Validators.maxLength(20),
      ]),
      lat: new FormControl(this.location.lat, [
        Validators.maxLength(20),
      ]),
      comment: new FormControl(this.location.comment, [
        Validators.maxLength(20),
      ]),

      type: new FormControl(this.location.type, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
    this.loadData();

    this.loadCustomers();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.locationForm.controls;
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
    return this.locationForm.get('customerId')!;
  }

  get name() {
    return this.locationForm.get('name')!;
  }
  get streetNumber() {
    return this.locationForm.get('streetNumber')!;
  }
  get streetName() {
    return this.locationForm.get('streetName')!;
  }

  get city() {
    return this.locationForm.get('city')!;
  }
  get suburb() {
    return this.locationForm.get('suburb')!;
  }
  get postCode() {
    return this.locationForm.get('postCode')!;
  }
  get lon() {
    return this.locationForm.get('lon')!;
  }
  get lat() {
    return this.locationForm.get('lat')!;
  }
  get comment() {
    return this.locationForm.get('comment')!;
  }
  get type() {
    return this.locationForm.get('type')!;
  }

  addNewLocation() {

    if (this.locationForm.invalid || this.isSubmitted) {
      for (const control of Object.keys(this.locationForm.controls)) {
        this.locationForm.controls[control].markAsTouched();
      }
      return;
    }
    this.isSubmitted = true;
    this.locationService.createLocation
      (this.locationForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Location has been created',
          showConfirmButton: false,
          timer: 1500
        })


        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/locations/locations-list']);
        });

      }, error => {
        this.isSubmitted = false;
      });
    this.locationForm.reset();
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

  // Choose customer using select dropdown
  changeCustomer(e) {
    
    this.customerId.setValue(e.target.value, {
      onlySelf: true
    })
  }



}
