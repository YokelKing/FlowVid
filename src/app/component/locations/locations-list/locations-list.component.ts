import { Component, OnInit, ViewChild } from "@angular/core";
import { ILocation } from "src/app/shared/models/locations";
import { LocationsService } from "../locations.service";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LocationEditComponent } from "../location-edit/location-edit.component";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { CustomersService } from "../../customers/customers.service";

import { ICustomer } from "src/app/shared/models/customers";
@Component({
  selector: "app-locations-list",
  templateUrl: "./locations-list.component.html",
  styleUrls: ["./locations-list.component.scss"],
})
export class LocationsListComponent implements OnInit {
  customers: ICustomer[];
  locations: ILocation[];
  public displayedColumns: string[] = [
   "id",
    // "customerId",
    "customername",
    "name",
    "streetNumber",
    "streetName",
    "suburb",
    "city",
    "postCode",
    "lon",
    "lat",
    "comment",
    "type",
    "status",
    "createdDate",
    "action",
  ];
  dataSource: MatTableDataSource<ILocation>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  location: ILocation;
  closeResult: string;
  locationForm: FormGroup;
  id;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private locationService: LocationsService,
    private customerService: CustomersService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLocations();
    this.loadCustomers();

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.locationForm.controls;
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

  loadLocations() {
    this.locationService.getAllLocations().subscribe(
      (result) => {
        console.log(result);
        this.locations = result;
        this.dataSource = new MatTableDataSource(result);
        // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editLocation(data: ILocation): void {
    const ref = this.modalService.open(LocationEditComponent, {
      centered: true,
      size: 'xl'
    });
    ref.componentInstance.location = data;

    ref.result.then(
      (yes) => {
        console.log("Yes Click");

        this.loadLocations();
        this.loadCustomers();
      },
      (cancel) => {
        console.log("Cancel Click");
      }
    );
  }
  deleteLocation(data: ILocation): void {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        this.locationService.deleteLocation(data);

        this.locationService.deleteLocation(data).subscribe((data) => data);

        this.locations = this.locations.filter((r) => r.id !== data.id);
        Swal.fire(
          "Deleted!",
          "Your imaginary file has been deleted.",
          "success"
        );

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  }
}

