import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { IJob } from "src/app/shared/models/jobs";
import { JobsService } from "../jobs.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { DatePipe } from "@angular/common";
import { ProgressService } from "../../progress/progress.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: "app-task-create-edit",
  templateUrl: "./task-create-edit.component.html",
  styleUrls: ["./task-create-edit.component.scss"],
  providers: [DatePipe],
})
export class TaskCreateEditComponent implements OnInit {
  [x: string]: any;
  title: string;
  job: IJob;
  closeResult: string;
  taskForm: FormGroup;
  JobID?: number;
  isSubmitted = false;
  tabIndex: number = 0;
  tabCount = 2;
  minStartTime: any;
  minEndTime: any;
  minStartDate: Date;
  maxStartDate: Date;
  minEndDate: Date;
  maxEndDate: Date;
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
    // "jobTask",
    // "jobDocument",
    // "resourceJobCost",
    "dateOpend",
    "dateDue",
    "dateClosed",
    "status",
    "createdDate",
    "action",
  ];
  dataSource: MatTableDataSource<IJob>;
  action = "Add";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private datePipe: DatePipe,
    public modal: NgbActiveModal,
    private ProgressService: ProgressService,
    private jobService: JobsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.task = {} as IJob;
  }

  ngOnInit(): void {
    this.action = this.task.id ? "Update" : "Add";
    this.taskForm = new FormGroup({
      description: new FormControl(this.task.description, [Validators.required]),
      dateOpened: new FormControl(this.task.dateOpened, [Validators.required]),
      dateDue: new FormControl(this.task.dateDue, [Validators.required]),
      dateClosed: new FormControl(this.task.dateClosed, [Validators.required]),
    });

    this.loadData();

    this.loadJobProgressStatus();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.taskForm.controls;
  }
  Task(type: string) {
    if (type.toLowerCase() == "next") {
      this.tabIndex = (this.tabIndex + 1) % this.tabCount;
      this.loadJobs();
    }
  }
  loadData() {
    this.title = "Add new ";
  }
  createNewTask(){
    this.modal.close(this.taskForm.value);
  }
  addNewJob() {
    if (this.taskForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.jobService.createJob(this.taskForm.value).subscribe(
      (data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Job has been created",
          showConfirmButton: false,
          timer: 1500,
        });
        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router
          .navigateByUrl("/", { skipLocationChange: true })
          .then(() => {
            this.router.navigate(["/jobs/jobs-list"]);
          });
        //this.Task('next');
      },
      (error) => {
        this.isSubmitted = false;
        this.loadJobs();
      }
    );
  }
  addJobTask(){
    debugger;
    this.jobTasks().push(this.newTask());
  }

  removeJobTask(taskIndex: number) {
    this.jobTasks().removeAt(taskIndex);
     }

  Cancel() {
    this.router.navigate(["jobs/jobs-list"]);
  }

  AddTask(data: IJob): void {
    const ref = this.modalService.open(TaskCreateEditComponent, {
      size: "xl",
      centered: true,
    });
    ref.componentInstance.job = data;

    ref.result.then(
      (yes) => {
        console.log("Yes Click");
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

  open(content: any) {
    this.modalService
      .open(content, { size: "xl", ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  loadJobs() {
    this.jobService.getAllJobs().subscribe(
      (result) => {
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

  loadJobProgressStatus() {
    this.ProgressService.getAllProgresss().subscribe(
      (result) => {
        console.log("progress", result);
        this.progress = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get status() {
    return this.taskForm.get("status")!;
  }

  get description() {
    return this.taskForm.get("description")!;
  }

  get jobProgressStatusID() {
    return this.taskForm.get("jobProgressStatusID")!;
  }

  get dateOpend() {
    return this.taskForm.get("dateOpend")!;
  }

  changeJobProgressStatus(e) {
    this.jobProgressStatusID.setValue(e.target.value, {
      onlySelf: true,
    });
  }
}
