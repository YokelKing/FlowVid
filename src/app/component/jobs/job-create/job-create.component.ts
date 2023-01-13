
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IJob } from 'src/app/shared/models/jobs';
import { JobsService } from '../jobs.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CustomersService } from '../../customers/customers.service';
import { ICustomer } from "src/app/shared/models/customers";
//import { JobEditComponent } from "../job-edit/job-edit.component";
import { TeamsService } from "../../teams/teams.service";
import { ResourcesService } from "../../resources/resources.service";

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
@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.scss']
})
export class JobCreateComponent implements OnInit {

  [x: string]: any;
  title: string;
  job: IJob;
  closeResult: string;
  jobForm: FormGroup;
  JobID?: number;
  isSubmitted = false;
  tabIndex: number = 0;
  tabCount = 2;
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
    private jobService: JobsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {     this.job = {} as IJob;
  }

  ngOnInit(): void {
    this.jobForm = new FormGroup({
    
      description: new FormControl(this.job.description, [
        Validators.required
      ]),
      customerId: new FormControl(this.job.customerId, [
        Validators.required
      ]),
      teamId: new FormControl(this.job.teamId, [
        Validators.required,
      ]),
      resourceId: new FormControl(this.job.resourceId, [
        Validators.required,
      ]),
 
      divisionID: new FormControl(this.job.divisionID, [
        Validators.required,
      ]),
 
      jobAssetID: new FormControl(this.job.jobAssetID, [
        Validators.required,
      ]),
 

      jobIssueTypeID: new FormControl(this.job.jobIssueTypeID, [
        Validators.required,
      ]),
 
      jobPriorityID: new FormControl(this.job.jobPriorityID, [
        Validators.required,
      ]),
 
      jobSourceID: new FormControl(this.job.jobSourceID, [
        Validators.required,
      ]),
      jobProgressStatusID: new FormControl(this.job.jobProgressStatusID, [
        Validators.required,
      ]),


      
      externalRefNo: new FormControl(this.job.externalRefNo, [
     ]),

      
      jobTypeID: new FormControl(this.job.jobTypeID, [
        Validators.required,
      ]),
 
      

    });

    



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
  Task(type: string)
  {
      if (type.toLowerCase() == "next") {
      this.tabIndex = (this.tabIndex + 1) % this.tabCount;
      this.loadJobs();
    }

  }
  loadData() {

    this.title = "Add new ";

  }


  addNewJob() {
  if (this.jobForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.jobService.createJob
      (this.jobForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Job has been created',
          showConfirmButton: false,
          timer: 1500
        })
        this.isSubmitted = false;
        this.modalService.dismissAll();
        // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        //   this.router.navigate(['/jobs/jobs-list']);
        // });
   this.Task('next');
      }, error => {
        this.isSubmitted = false;
        this.loadJobs();
      });
    //this.jobForm.reset();
  }

  editJob(data: IJob): void {
    this.loadJobs();

    
    //this.jobService.deleteJob(data).subscribe((data) => data);
    this.id = this.route.snapshot.params['id'];
  

    //this.jobService.deleteJob(data).subscribe((data) => data);
    this.jobService.getJobById(data.id).subscribe(data => {
      this.job = data;
    }, error => console.log(error));

    //this.router.navigate([`jobs/job-edit/${data.id}`]);

    this.router.navigate(['jobs/job-edit',data.id]);
    

    // const ref = this.modalService.open(JobEditComponent, {
    //   size: 'xl',
    //   centered: true,
    // });
    // ref.componentInstance.job = data;

    // ref.result.then(
    //   (yes) => {
    //     console.log("Yes Click");

    //     this.loadJobs();
    //   },
    //   (cancel) => {
    //     console.log("Cancel Click");
    //   }
    // );
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

  open(content: any) {
    this.modalService.open(content, { size: 'xl',  ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
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
      console.log(result);
      this.jobs = result;
      //debugger;
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
    return this.jobForm.get('description')!;
  }
  get customerId() {
    return this.jobForm.get('customerId')!;
  }
  get teamId() {
    return this.jobForm.get('teamId')!;
  }
  get resourceId() {
    return this.jobForm.get('resourceId')!;
  }


  get divisionID() {
    return this.jobForm.get('divisionID')!;
  }

  get jobAssetID() {
    return this.jobForm.get('jobAssetID')!;
  }

  get jobIssueTypeID() {
    return this.jobForm.get('jobIssueTypeID')!;
  }


  get jobPriorityID() {
    return this.jobForm.get('jobPriorityID')!;
  }


  get jobSourceID() {
    return this.jobForm.get('jobSourceID')!;
  }


  get jobTask() {
    return this.jobForm.get('jobTask')!;
  }

  get jobDocument() {
    return this.jobForm.get('jobDocument')!;
  }

  get resourceJobCost() {
    return this.jobForm.get('resourceJobCost')!;
  }


  get jobProgressStatusID() {
    return this.jobForm.get('jobProgressStatusID')!;
  }

  get externalRefNo() {
    return this.jobForm.get('externalRefNo')!;
  }


  get jobTypeID() {
    return this.jobForm.get('jobTypeID')!;
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
  

    


}
