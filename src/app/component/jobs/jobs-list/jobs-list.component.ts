import { Component, OnInit, ViewChild } from "@angular/core";
import { IJob } from "src/app/shared/models/jobs";
import { JobsService } from "../jobs.service";
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
import { JobEditComponent } from "../job-edit/job-edit.component";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-jobs-list",
  templateUrl: "./jobs-list.component.html",
  styleUrls: ["./jobs-list.component.scss"],
})
export class JobsListComponent implements OnInit {
  jobs: IJob[];
  public displayedColumns: string[] = [
    "id",
    "description",
    "customer",
    "division",
    "jobAsset",
    "jobIssueType",
    "jobPriority",
    "jobSource",
    "team",
    "jobProgressStatus",
    "jobType",
    "jobTask",
    "jobDocument",
    "resourceJobCost",
    "dateOpend",
    "dateDue",
    "dateClosed",
    "status",
    "createdDate",
    "action",
  ];
  dataSource: MatTableDataSource<IJob>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  job: IJob;
  closeResult: string;
  jobForm: FormGroup;
  id;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private jobService: JobsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.jobForm.controls;
  }

  loadJobs() {
    this.jobService.getAllJobs().subscribe(
      (result) => {
        console.log(result);
        this.jobs = result;
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

  editJob(data: IJob): void {
    const ref = this.modalService.open(JobEditComponent, {
      centered: true,
    });
    ref.componentInstance.job = data;

    ref.result.then(
      (yes) => {
        console.log("Yes Click");

        this.loadJobs();
      },
      (cancel) => {
        console.log("Cancel Click");
      }
    );
  }
  deleteJob(data: IJob): void {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        //this.jobService.deleteJob(data);

        this.jobService.deleteJob(data).subscribe((data) => data);

        this.jobs = this.jobs.filter((r) => r.id !== data.id);
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

