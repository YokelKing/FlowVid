import { Component, OnInit, ViewChild } from "@angular/core";
import { ICustomer } from "src/app/shared/models/customers";
import { CustomersService } from "../../customers.service";
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
import { CustomerEditComponent } from "../../customer-edit/customer-edit/customer-edit.component";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-customers-list",
  templateUrl: "./customers-list.component.html",
  styleUrls: ["./customers-list.component.scss"],
})
export class CustomersListComponent implements OnInit {
  customers: ICustomer[];
  public displayedColumns: string[] = [
    "id",
    "name",
    "code",
    "status",
    "createdDate",
    "action",
  ];
  dataSource: MatTableDataSource<ICustomer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  customer: ICustomer;
  closeResult: string;
  customerForm: FormGroup;
  id;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private customerService: CustomersService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe(
      (result) => {
        this.customers = result;
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

  editCustomer(data: ICustomer): void {
    const ref = this.modalService.open(CustomerEditComponent, {
      centered: true,
    });
    ref.componentInstance.customer = data;

    ref.result.then(
      (yes) => {
        console.log("Yes Click");

        this.loadCustomers();
      },
      (cancel) => {
        console.log("Cancel Click");
      }
    );
  }
  deleteCustomer(data: ICustomer): void {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        //this.customerService.deleteCustomer(data);

        this.customerService.deleteCustomer(data).subscribe((data) => data);

        this.customers = this.customers.filter((r) => r.id !== data.id);
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
