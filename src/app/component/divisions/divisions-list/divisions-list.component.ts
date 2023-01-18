import { Component, OnInit, ViewChild } from "@angular/core";
import { IDivision } from "src/app/shared/models/divisions";
import { DivisionsService } from "../divisions.service";
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
import { DivisionEditComponent } from "../division-edit/division-edit.component";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-divisions-list",
  templateUrl: "./divisions-list.component.html",
  styleUrls: ["./divisions-list.component.scss"],
})
export class DivisionsListComponent implements OnInit {
  divisions: IDivision[];
  
  division: IDivision;
  public displayedColumns: string[] = [
    "id",
    "name",
    "code",
    "type",
    "status",
    "createdDate",
    "action",
  ];
  dataSource: MatTableDataSource<IDivision>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  closeResult: string;
  divisionForm: FormGroup;
  id;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private divisionService: DivisionsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDivisions();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.divisionForm.controls;
  }

  loadDivisions() {
    this.divisionService.getAllDivisions().subscribe(
      (result) => {
        
        this.divisions = result;
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

  editDivision(data: IDivision): void {
    const ref = this.modalService.open(DivisionEditComponent, {
      centered: true,
    });
    ref.componentInstance.division = data;

    ref.result.then(
      (yes) => {
        console.log("Yes Click");

        this.loadDivisions();
      },
      (cancel) => {
        console.log("Cancel Click");
      }
    );
  }
  deleteDivision(data: IDivision): void {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
       // this.divisionService.deleteDivision(data);

        this.divisionService.deleteDivision(data).subscribe((data) => data);

        this.divisions = this.divisions.filter((r) => r.id !== data.id);
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

