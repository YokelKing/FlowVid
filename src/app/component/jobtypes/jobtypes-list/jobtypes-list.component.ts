import { Component, OnInit, ViewChild } from "@angular/core";
import { IJobtype } from "src/app/shared/models/jobtypes";
import { JobtypesService } from "../jobtypes.service";
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
import { JobtypeEditComponent } from "../jobtype-edit/jobtype-edit.component";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-jobtypes-list",
  templateUrl: "./jobtypes-list.component.html",
  styleUrls: ["./jobtypes-list.component.scss"],
})
export class JobtypesListComponent implements OnInit {
  jobtypes: IJobtype[];
  public displayedColumns: string[] = [
    "id",
    "name",
    "code",
    "status",
    "createdDate",
    "action",
  ];
  dataSource: MatTableDataSource<IJobtype>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  jobtype: IJobtype;
  closeResult: string;
  jobtypeForm: FormGroup;
  id;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private jobtypeService: JobtypesService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJobtypes();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.jobtypeForm.controls;
  }

  loadJobtypes() {
    this.jobtypeService.getAllJobtypes().subscribe(
      (result) => {
        
        this.jobtypes = result;
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

  editJobtype(data: IJobtype): void {
    const ref = this.modalService.open(JobtypeEditComponent, {
      centered: true,
    });
    ref.componentInstance.jobtype = data;

    ref.result.then(
      (yes) => {
        console.log("Yes Click");

        this.loadJobtypes();
      },
      (cancel) => {
        console.log("Cancel Click");
      }
    );
  }
  deleteJobtype(data: IJobtype): void {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        //this.jobtypeService.deleteJobtype(data);

        this.jobtypeService.deleteJobtype(data).subscribe((data) => data);

        this.jobtypes = this.jobtypes.filter((r) => r.id !== data.id);
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

