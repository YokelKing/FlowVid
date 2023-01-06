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
import { ILocation } from "src/app/shared/models/locations";
import {LocationsService} from "../locations.service"
import Swal from "sweetalert2/dist/sweetalert2.js";
import { CustomersService } from "../../customers/customers.service";
import { ICustomer } from "src/app/shared/models/customers";

@Component({
  selector: "app-location-edit",
  templateUrl: "./location-edit.component.html",
  styleUrls: ["./location-edit.component.scss"],
})
export class LocationEditComponent implements OnInit {
  customers: ICustomer[];
  title: string;
  location: ILocation;
  closeResult: string;
  editForm: FormGroup;
  LocationID?: number;
  isSubmitted = false;
  constructor(
    private customerService: CustomersService,
    public modal: NgbActiveModal,
    private LocationsService: LocationsService,
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

  editLocation() {
    if (this.editForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;



    this.loadCustomers();
    this.LocationsService
      .updateLocation(this.location.id, this.editForm.value)
      .subscribe(
        (x) => {
          this.isSubmitted = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Location has been updated',
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
      id: [this.location.id],
      customerId: [this.location.customerId, Validators.required],
      name: [this.location.name, Validators.required],
      streetNumber: [this.location.streetNumber, Validators.required],
      streetName: [this.location.streetName, Validators.required],
      suburb: [this.location.suburb, Validators.required],
      city: [this.location.city, Validators.required],
      postCode: [this.location.postCode, Validators.required],
      lon: [this.location.lon, ""],
      lat: [this.location.lat, ""],
      comment: [this.location.comment, ""],
      type: [this.location.type, Validators.required],
     // status: [this.location.status, Validators.required],

      
    });
  }

  // Choose customer using select dropdown
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
