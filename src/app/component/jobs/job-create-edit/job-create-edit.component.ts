import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
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
import { CustomersService } from "../../customers/customers.service";
import { ICustomer } from "src/app/shared/models/customers";
import { TeamsService } from "../../teams/teams.service";
import { ResourcesService } from "../../resources/resources.service";
import { DatePipe } from "@angular/common";
import { JobassetsService } from "../../jobassets/jobassets.service";
import { DivisionsService } from "../../divisions/divisions.service";
import { TypesService } from "../../type/type.service";
import { PriorityService } from "../../priority/priority.service";
import { SourceService } from "../../source/source.service";
import { ProgressService } from "../../progress/progress.service";
import { JobtypesService } from "../../jobtypes/jobtypes.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { TaskCreateEditComponent } from "../task-create-edit/task-create-edit.component";
import { MatDialog } from "@angular/material/dialog";
import { ITask } from "src/app/shared/models/task";

@Component({
  selector: "app-job-create",
  templateUrl: "./job-create-edit.component.html",
  styleUrls: ["./job-create-edit.component.scss"],
  providers: [DatePipe],
})
export class JobCreateEditComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  title: string;
  action: string;
  job: IJob;
  closeResult: string;
  jobForm: FormGroup;
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

  public taskDisplayedColumns: string[] = [
    "id",
    "description",
    "dateOpend",
    "dateDue",
    "dateClosed",
    "action",
  ];
  taskDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private datePipe: DatePipe,
    public modal: NgbActiveModal,
    private customerService: CustomersService,
    private TeamsService: TeamsService,
    private resourceService: ResourcesService,
    private JobassetsService: JobassetsService,
    private DivisionsService: DivisionsService,
    private TypesService: TypesService,
    private PriorityService: PriorityService,
    private SourceService: SourceService,
    private ProgressService: ProgressService,
    private JobtypesService: JobtypesService,
    private jobService: JobsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private _dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.job = {} as IJob;
  }
  getJobDetails() {
    this.jobService.getJobById(this.JobID).subscribe(
      (res) => {
        if (res) {
          this.job = res;  
          this.setJobForm(); 
          this.jobForm.controls["dateClosed"].setValidators([Validators.required]);
          console.log(this.job.jobTask);
          this.taskDataSource.data = [
            ...this.jobTasks().value
          ] 
          console.log(this.taskDataSource);
        }
      },
      error => console.log(error)
    );
  }

  setJobForm(): void{
    this.jobForm = new FormGroup({
      description: new FormControl(this.job.description, [Validators.required]),
      customerId: new FormControl(this.job.customer?.id, [Validators.required]),
      teamId: new FormControl(this.job.team?.id, [Validators.required]),
      resourceId: new FormControl(this.job.resource?.id, [Validators.required]),
      divisionID: new FormControl(this.job.division?.id, [Validators.required]),
      jobAssetID: new FormControl(this.job.jobAsset?.id, [Validators.required]),
      jobIssueTypeID: new FormControl(this.job.jobIssueType?.id, [Validators.required]),
      jobPriorityID: new FormControl(this.job.jobPriority?.id, [Validators.required]),
      jobSourceID: new FormControl(this.job.jobSource?.id, [Validators.required]),
      jobProgressStatusID: new FormControl(this.job.jobProgressStatus?.id, [Validators.required]),
      jobTypeID: new FormControl(this.job.jobType?.id, [Validators.required]),
      externalRefNo: new FormControl(this.job.externalRefNo, []),
      dateOpend: new FormControl(this.job.dateOpend, [Validators.required]),
      dateDue: new FormControl(this.job.dateDue, [Validators.required]),
      dateClosed: new FormControl(this.job.dateClosed, []),
      jobTask: this.fb.array(this.job.jobTask ? this.job.jobTask?.map(task => this.addTaskInList(task)) : []),
    });
    console.log(this.job.jobTask);
    console.log(this.jobTasks());
  }
  addTaskInList(task){
    return this.fb.group(task);
  }
  ngOnInit(): void {
    this.setJobForm();
    this.JobID = this.route.snapshot.params['id'];
    this.action = this.JobID ? 'Edit' : 'Create';
    if(this.JobID){
      this.getJobDetails();
    }
    else{
      this.setJobForm();
    }

    this.loadData();

    this.loadCustomers();
    this.loadTeams();
    this.loadResources();

    this.loadDivisions();
    this.loadJobAssets();
    this.loadJobIssueTypes();
    this.loadJobPriority();
    this.loadJobSource();
    this.loadJobProgressStatus();
    this.loadJobTypes();
    this.loadJobs();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.jobForm.controls;
  }

  jobTasks(): FormArray {
    return this.jobForm.get("jobTask") as FormArray;
  }

  newTask(): FormGroup {
    return this.fb.group({
      dateOpend: "",
      description: "",
      jobProgressStatusID: "",
      status: "",
    });
  }

  // addJobTask() {

  //   const dialogRef = this._dialog.open(TaskCreateEditComponent, {
  //     maxWidth: '100vw',
  //     maxHeight: '100vh',
  //     width: '400px',
  //     panelClass: 'full-screen-modal'
  //   });

    // this.jobTasks().push(this.newTask());
 // }

  // removeJobTask(taskIndex: number) {
  //   this.jobTasks().removeAt(taskIndex);
  // }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.taskDataSource.filter = filterValue;
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

  saveJob(){
    this.jobForm.patchValue({
      jobTask : this.taskDataSource.data
    })
    console.log(this.jobForm.value)
    if(this.JobID){
      this.editJob();
    }
    else{
      this.addNewJob();
    }
  }
  addNewJob() {
    if (this.jobForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.jobService.createJob(this.jobForm.value).subscribe(
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
        this.Task('next');
      },
      (error) => {
        this.isSubmitted = false;
        this.loadJobs();
      }
    );
  }
  editJob() {
    if (this.jobForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.jobService
      .updateJob(this.job.id, this.jobForm.value)
      .subscribe(
        (x) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Job has been updated',
            showConfirmButton: false,
            timer: 1500
          })

          this.isSubmitted = false;
          this.modalService.dismissAll();
          this.router
          .navigateByUrl("/", { skipLocationChange: true })
          .then(() => {
            this.router.navigate(["/jobs/jobs-list"]);
          });
        },
        (error) => {
          this.isSubmitted = false;
          this.loadJobs();
        }
      );
    this.jobForm.reset();   

  }


  Cancel() {
    this.router.navigate(["jobs/jobs-list"]);
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  AddTask(data?: IJob): void {
    ;
    const ref = this.modalService.open(TaskCreateEditComponent, {});
    if(data){
      ref.componentInstance.job = data;
    }
    ref.result.then(
      (task: ITask) => {
        if(task){
          const newTask = {
            ...task,
          }
          this.taskDataSource.data = [
            ...this.taskDataSource.data,
            newTask
          ]
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'New Task created',
            showConfirmButton: false,
            timer: 1500
          })
          this.taskDataSource.paginator = this.paginator;
          this.taskDataSource.sort = this.sort;

        }
        else{
          console.log("Cancel Click");
        }
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

  loadTeams() {
    this.TeamsService.getAllTeams().subscribe(
      (result) => {
        this.teams = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadResources() {
    this.resourceService.getAllResources().subscribe(
      (result) => {
        this.resources = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadDivisions() {
    this.DivisionsService.getAllDivisions().subscribe(
      (result) => {
        this.divisions = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadJobAssets() {
    this.JobassetsService.getAllJobassets().subscribe(
      (result) => {
        this.assets = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadJobIssueTypes() {
    this.TypesService.getAllTypes().subscribe(
      (result) => {
        this.types = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadJobPriority() {
    this.PriorityService.getAllPriority().subscribe(
      (result) => {
        this.priority = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadJobSource() {
    this.SourceService.getAllSource().subscribe(
      (result) => {
        this.sources = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadJobs() {
    this.jobService.getAllJobs().subscribe(
      (result) => {
        this.jobs = result;
        //;
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
        this.progress = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadJobTypes() {
    this.JobtypesService.getAllJobtypes().subscribe(
      (result) => {
        this.jobtypes = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get description() {
    return this.jobForm.get("description")!;
  }
  get customerId() {
    return this.jobForm.get("customerId")!;
  }
  get teamId() {
    return this.jobForm.get("teamId")!;
  }
  get resourceId() {
    return this.jobForm.get("resourceId")!;
  }

  get divisionID() {
    return this.jobForm.get("divisionID")!;
  }

  get jobAssetID() {
    return this.jobForm.get("jobAssetID")!;
  }

  get jobIssueTypeID() {
    return this.jobForm.get("jobIssueTypeID")!;
  }

  get jobPriorityID() {
    return this.jobForm.get("jobPriorityID")!;
  }

  get jobSourceID() {
    return this.jobForm.get("jobSourceID")!;
  }

  get jobTask() {
    return this.jobForm.get("jobTask")!;
  }

  get jobDocument() {
    return this.jobForm.get("jobDocument")!;
  }

  get resourceJobCost() {
    return this.jobForm.get("resourceJobCost")!;
  }

  get jobProgressStatusID() {
    return this.jobForm.get("jobProgressStatusID")!;
  }

  get externalRefNo() {
    return this.jobForm.get("externalRefNo")!;
  }

  get jobTypeID() {
    return this.jobForm.get("jobTypeID")!;
  }

  get dateOpend() {
    return this.jobForm.get("StartDate")!;
  }

  get dateDue() {
    return this.jobForm.get("dateDue")!;
  }

  get dateClosed() {
    return this.jobForm.get("dateClosed")!;
  }

  // Choose customer using select dropdown
  changeCustomer(e) {
    this.customerId.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeTeam(e) {
    this.teamId.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeResource(e) {
    this.resourceId.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeDivision(e) {
    this.divisionID.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeJobAsset(e) {
    this.jobAssetID.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeJobIssueType(e) {
    this.jobIssueTypeID.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeJobPriority(e) {
    this.jobPriorityID.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeJobSource(e) {
    this.jobSourceID.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeJobProgressStatus(e) {
    this.jobProgressStatusID.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeJobType(e) {
    this.jobTypeID.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  // public onStartDateChange(event: MatDatepickerInputEvent<Date>): void {
  //   //;
  //   this.minEndDate = new Date(event.value);
  //   let selectedEndDate = this.jobForm.controls["EndDate"].value;
  //   if (selectedEndDate != "") {
  //     this.jobForm.patchValue({
  //       EndDate: ""
  //     });
  //   }
  // }

  // public onEndDateChange(event: MatDatepickerInputEvent<Date>): void {
  //   if (this.datePipe.transform(new Date(event.value), 'dd/MM/yyyy') == "") return;
  //   if (this.IsDateSame()) {
  //     let startTime = this.jobForm.controls["StartTime"].value;;
  //     let endTime = this.jobForm.controls["EndTime"].value;
  //     if (!(startTime == "" || endTime == "") && startTime >= endTime) {
  //       this.jobForm.patchValue({
  //         EndTime: ""
  //       });
  //     }
  //   }
  // }

  /*
    fxn to check start and end time are valid 
    start time depends on end date  and end date
    */
  // onStartTimeChange(startTime) {
  //   if (this.isUpdating || startTime == "") return;
  //   let endTime = this.jobForm.controls["EndTime"].value;

  //   if (endTime != "") {
  //     this.jobForm.patchValue({
  //       EndTime: ""
  //     });
  //   }

  // }

  /**
   *  if end time value blank returns
   * checks if start & end date are not blank
   * and same and start time is not blank
   */
  // onEndTimeChange(endTime) {
  //   if (this.isUpdating || endTime == "") return;
  //   let startTime = this.jobForm.controls["StartTime"].value;

  //   if (startTime != "" && this.IsDateSame()) {
  //     this.ValidateAndUpdateEndTime(startTime, endTime);
  //   }
  // }

  // ValidateAndUpdateEndTime(startTime, endTime) {
  //   let selectedStartDate = this.getFormattedDate(this.jobForm.controls["StartDate"].value);
  //   let selectedEndDate = this.getFormattedDate(this.jobForm.controls["EndDate"].value);
  //   let startDTime; let endDTime;
  //   startDTime = this.formatDateAndTime(selectedStartDate, startTime);
  //   endDTime = this.formatDateAndTime(selectedEndDate, endTime);
  //   if (startDTime != "" && endDTime != "" &&
  //     startDTime.getTime() >= endDTime.getTime()) {
  //     this.jobForm.patchValue({
  //       EndTime: ""
  //     });
  //   }
  // }

  // formatDateAndTime(date, time): any {
  //   if (date != "" && time != "") {
  //     return (new Date(date.toString().concat(" ", time)));
  //   }
  //   return ""
  // }

  // IsDateSame(): Boolean {
  //   let selectedStartDate = this.getFormattedDate(this.jobForm.controls["StartDate"].value);
  //   let selectedEndDate = this.getFormattedDate(this.jobForm.controls["EndDate"].value);

  //   if (selectedStartDate != "" && selectedEndDate != "" && selectedStartDate == selectedEndDate) {
  //     { return true; }
  //   }
  //   return false;
  // }

  /*
    formats & returns form control date value into dd/MM/yyyy format
    */
  // getFormattedDate(fcDate): any {
  //   if (fcDate != undefined && fcDate != "" && fcDate != null)
  //     return (this.datePipe.transform(new Date(fcDate), 'dd/MM/yyyy'));
  //   return "";
  // }

  /*
  render time picker UI as per the updated time value
  */
  // SetStartTimeOnFocus() {
  //   if (!this.isUpdating) {
  //     let selectedStartDate = this.datePipe.transform(this.jobForm.controls["StartDate"].value,
  //       'yyyy-MM-dd');
  //     var currentTime = this.ConvertTimeStringIntoNumber(this.datePipe.transform(new Date().getTime(),
  //       'hh:mm a'));
  //     var startDateObj = new Date(selectedStartDate + ' ' + currentTime);
  //     var currentDateObj = new Date(this.datePipe.transform(new Date(), 'yyyy-MM-dd') + ' ' + currentTime);

  //     if (startDateObj > currentDateObj) {
  //       this.minStartTime = null;
  //     }
  //     else {
  //       this.minStartTime = (new Date()).toLocaleString('en-US',
  //         { hour: 'numeric', minute: 'numeric', hour12: true });
  //     }
  //   }
  // }

  // SetEndTimeOnFocus() {
  //   if (!this.isUpdating) {
  //     let selectedEndDate = this.datePipe.transform(this.jobForm.controls["EndDate"].value,
  //       'yyyy-MM-dd');
  //     var currentTime = this.ConvertTimeStringIntoNumber(this.datePipe.transform(new Date().getTime(),
  //       'hh:mm a'));
  //     var endDateObj = new Date(selectedEndDate + ' ' + currentTime);
  //     var currentDateObj = new Date(this.datePipe.transform(new Date(), 'yyyy-MM-dd') + ' ' + currentTime);

  //     if (endDateObj > currentDateObj) {
  //       if (this.IsDateSame()) {
  //         this.minEndTime = this.GetEndTime(endDateObj).toLocaleString('en-US',
  //           { hour: 'numeric', minute: 'numeric', hour12: true });
  //       }
  //       else {
  //         this.minEndTime = null;
  //       }
  //     }
  //     else {
  //       this.minEndTime = this.GetEndTime(new Date()).toLocaleString('en-US',
  //         { hour: 'numeric', minute: 'numeric', hour12: true });
  //     }
  //   }
  // }

  // ConvertTimeStringIntoNumber(time) {
  //   var matches = time.toLowerCase().match(/(\d{1,2}):(\d{2}) ([ap]m)/);
  //   var output = (parseInt(matches[1]) + (matches[3] == 'pm' ? 12 : 0)) + ':' + matches[2] + ':00';
  //   return output;
  // }

  // GetEndTime(date) {
  //   date.setMinutes(date.getMinutes() + 5);
  //   return date;
  // }
  editTask(task: ITask, taskIndex: number): void {
    const ref = this.modalService.open(TaskCreateEditComponent, {
      centered: true,
    });
    ref.componentInstance.task = task;

    ref.result.then(
      (data) => {
        if(data){
          this.taskDataSource.data = this.taskDataSource.data.map((item:ITask, index: number) => taskIndex === index ? data : item);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Task has been updated",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
    );
  }
  deleteTask(task: ITask, taskIndex: number): void{
    Swal.fire({
      title: "Are you sure want to delete?",
      text: "You will not be able to recover this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        this.taskDataSource.data = this.taskDataSource.data.filter((item: ITask, index: number) => taskIndex !== index);
        Swal.fire(
          "Deleted!",
          "Your imaginary file has been deleted.",
          "success"
        );

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  }
}
