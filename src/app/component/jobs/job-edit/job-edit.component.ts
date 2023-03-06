import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { IJob } from "src/app/shared/models/jobs";
import { JobsService } from "../jobs.service"
import Swal from "sweetalert2/dist/sweetalert2.js";
import { first } from 'rxjs/operators';

import { CustomersService } from '../../customers/customers.service';
import { ICustomer } from "src/app/shared/models/customers";
import { TeamsService } from "../../teams/teams.service";
import { ResourcesService } from "../../resources/resources.service";
import { JobassetsService } from "../../jobassets/jobassets.service";
import { DivisionsService } from "../../divisions/divisions.service";
import { TypesService } from "../../type/type.service";
import { PriorityService } from "../../priority/priority.service";
import { SourceService } from "../../source/source.service";
import { ProgressService } from "../../progress/progress.service";
import { JobtypesService } from "../../jobtypes/jobtypes.service";

@Component({
  selector: "app-job-edit",
  templateUrl: "./job-edit.component.html",
  styleUrls: ["./job-edit.component.scss"],
})
export class JobEditComponent implements OnInit {

  id: number;
  [x: string]: any;
  title: string;
  job: IJob;
  closeResult: string;
  editForm: FormGroup;
  JobID?: number;
  isSubmitted = false;
  customers: ICustomer[];
  teams: any;
  resources: any;
  divisions: any;
  assets: any;
  types: any;
  priority: any;
  sources: any;
  progress: any;
  jobtypes: any;

  constructor(
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
    private JobsService: JobsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getJobDetails();
    this.setForm();
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
  }

  get editFormData() {
    return this.editForm.controls;
  }
  getJobDetails() {
    this.JobsService.getJobById(this.id).subscribe(
      (res) => this.onJobSuccess(res),
      error => this.onJobError(error)
    );
  }

  //On success of job api call 
  onJobSuccess(result) {
    if (result) {
      this.job = result;
      this.setForm(result);

    }
  }

  //On error of job api call
  onJobError(error) {

  }

  editJob() {
    debugger;
    if (this.editForm.invalid || this.isSubmitted) {
      return;
    }
    this.job = this.editForm.value
    this.isSubmitted = true;
    this.JobsService
      .updateJob(this.job.id, this.editForm.value)
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
         this.router.navigate(['/jobs/job-edit/']);

        },
        (error) => {
          this.isSubmitted = false;
          this.loadJobs();
        }
      );
    this.editForm.reset();   

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

  Cancel() {

    this.router.navigate([`jobs/jobs-list`]);

  }



  // Choose customer using select dropdown
  changeCustomer(e) {

    this.customerId.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeTeam(e) {

    this.teamId.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeResource(e) {

    this.resourceId.setValue(e.target.value, {
      onlySelf: true
    })
  }


  changeDivision(e) {

    this.divisionID.setValue(e.target.value, {
      onlySelf: true
    })
  }


  changeJobAsset(e) {

    this.jobAssetID.setValue(e.target.value, {
      onlySelf: true
    })
  }



  changeJobIssueType(e) {

    this.jobIssueTypeID.setValue(e.target.value, {
      onlySelf: true
    })
  }



  changeJobPriority(e) {

    this.jobPriorityID.setValue(e.target.value, {
      onlySelf: true
    })
  }


  changeJobSource(e) {

    this.jobSourceID.setValue(e.target.value, {
      onlySelf: true
    })
  }



  changeJobProgressStatus(e) {
    this.jobProgressStatusID.setValue(e.target.value, {
      onlySelf: true
    })
  }



  changeJobType(e) {

    this.jobTypeID.setValue(e.target.value, {
      onlySelf: true
    })
  }




  get description() {
    return this.editForm.get('description')!;
  }
  get customerId() {
    return this.editForm.get('customerId')!;
  }
  get teamId() {
    return this.editForm.get('teamId')!;
  }
  get resourceId() {
    return this.editForm.get('resourceId')!;
  }

  get divisionID() {
    return this.editForm.get('divisionID')!;
  }

  get jobAssetID() {
    return this.editForm.get('jobAssetID')!;
  }

  get jobIssueTypeID() {
    return this.editForm.get('jobIssueTypeID')!;
  }

  get jobPriorityID() {
    return this.editForm.get('jobPriorityID')!;
  }

  get jobSourceID() {
    return this.editForm.get('jobSourceID')!;
  }

  get jobProgressStatusID() {
    return this.editForm.get('jobProgressStatusID')!;
  }

  get jobTypeID() {
    return this.editForm.get('jobTypeID')!;
  }

  setForm(job = null) {
    if (job) {
      this.editForm = this.fb.group({
        id: [this.job.id],
        description: [this.job.description, Validators.required],
        customerId: [this.job.customer.id, Validators.required],
        teamId: [this.job.team.id, Validators.required],
        // resourceId: [this.job.resource.id,Validators.required],
        divisionID: [this.job.division.id, Validators.required],
        jobAssetID: [this.job.jobAsset.id, Validators.required],
        jobIssueTypeID: [this.job.jobIssueType.id, Validators.required],
        jobPriorityID: [this.job.jobPriority.id, Validators.required],
        jobSourceID: [this.job.jobSource.id, Validators.required],
        jobProgressStatusID: [this.job.jobProgressStatus.id, Validators.required],
        externalRefNo: [this.job.externalRefNo],
        jobTypeID: [this.job.jobType.id, Validators.required],
        dateClosed: [this.job.dateClosed],
        dateDue: [this.job.dateDue],
        dateOpend: [this.job.dateOpend, Validators.required],


      });
    }
  }

}
