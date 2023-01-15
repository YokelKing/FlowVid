import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
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
import { JobsService } from "../jobs.service"
import Swal from "sweetalert2/dist/sweetalert2.js";


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
  [x: string]: any;
  title: string;
  job: IJob;
  closeResult: string;
  editForm: FormGroup;
  JobID?: number;
  isSubmitted = false;
  customers: ICustomer[];
  teams:any;
  resources:any;
  divisions:any;
  assets:any;
  types:any;
  priority:any;
  sources:any;
  progress:any;
  jobtypes:any;

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
  

    this.JobsService.getJobById(this.id).subscribe(data => {
      this.job = data;
      //console.log("asdf2222",this.job.id);
    }, error => console.log(error));

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

  editJob() {
    if (this.editForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.JobsService
      .updateJob(this.job.id, this.editForm.value)
      .subscribe(
        (x) => {
          this.isSubmitted = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Job has been updated',
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

  Cancel()
  {
    
    this.router.navigate([`jobs/job-create`]);

  }



  // get description() {
  //   return this.editForm.get('description')!;
  // }
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


  public setForm() {
    this.editForm = this.fb.group({
      //id: this.route.snapshot.params['id'],

      description: ["",Validators.required],
      customerId: ["",Validators.required],
      teamId: ["",Validators.required],
      resourceId: ["",Validators.required],
      divisionID: ["",Validators.required],
      jobAssetID: ["",Validators.required],
      jobIssueTypeID: ["",Validators.required],
      jobPriorityID: ["",Validators.required],
      jobSourceID: ["",Validators.required],
      jobProgressStatusID: ["",Validators.required],
      externalRefNo: ["",Validators.required],
      jobTypeID: ["",Validators.required],
      dateClosed: ["",Validators.required],
      dateDue: ["",Validators.required],
      dateOpend: ["",Validators.required],
      

      // description: [this.job.description, ""],
      // customerId: [this.job.customerId,Validators.required],
      // teamId: [this.job.teamId,Validators.required],
      // resourceId: [this.job.resourceId,Validators.required],
      // divisionID: [this.job.divisionID,Validators.required],
      // jobAssetID: [this.job.jobAssetID,Validators.required],
      // jobIssueTypeID: [this.job.jobIssueTypeID,Validators.required],
      // jobPriorityID: [this.job.jobPriorityID, Validators.required],
      // jobSourceID: [this.job.jobSourceID, Validators.required],
      // jobProgressStatusID: [this.job.jobProgressStatusID, Validators.required],
      // externalRefNo: [this.job.externalRefNo, ""],
      // jobTypeID: [this.job.jobTypeID, Validators.required],
    });
  }
}
