import { Component, OnInit, ViewChild } from "@angular/core";
import { IJobasset } from "src/app/shared/models/jobassets";
import { JobassetsService } from "../jobassets.service";
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
import { JobassetEditComponent } from "../jobasset-edit/jobasset-edit.component";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { CustomersService } from "../../customers/customers.service";

import { ICustomer } from "src/app/shared/models/customers";
@Component({
  selector: "app-jobassets-list",
  templateUrl: "./jobassets-list.component.html",
  styleUrls: ["./jobassets-list.component.scss"],
})
export class JobassetsListComponent implements OnInit {
  customers: ICustomer[];
  jobassets: IJobasset[];
  public displayedColumns: string[] = [
   "id",
    // "customerId",
    "customerName",
    "name",
    "code",
    "type",
    "status",
    "createdDate",
    "action",
  ];
  dataSource: MatTableDataSource<IJobasset>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  jobasset: IJobasset;
  closeResult: string;
  jobassetForm: FormGroup;
  id;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private jobassetService: JobassetsService,
    private customerService: CustomersService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJobassets();
    this.loadCustomers();

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.jobassetForm.controls;
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

  loadJobassets() {
    this.jobassetService.getAllJobassets().subscribe(
      (result) => {
        console.log(result);
        this.jobassets = result;
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

  editJobasset(data: IJobasset): void {
    const ref = this.modalService.open(JobassetEditComponent, {
      centered: true,
      size: 'xl'
    });
    ref.componentInstance.jobasset = data;

    ref.result.then(
      (yes) => {
        console.log("Yes Click");

        this.loadJobassets();
        this.loadCustomers();
      },
      (cancel) => {
        console.log("Cancel Click");
      }
    );
  }
  deleteJobasset(data: IJobasset): void {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        //this.jobassetService.deleteJobasset(data);

        this.jobassetService.deleteJobasset(data).subscribe((data) => data);

        this.jobassets = this.jobassets.filter((r) => r.id !== data.id);
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

