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
import {JobsService} from "../jobs.service"
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-job-edit",
  templateUrl: "./job-edit.component.html",
  styleUrls: ["./job-edit.component.scss"],
})
export class JobEditComponent implements OnInit {
  title: string;
  job: IJob;
  closeResult: string;
  editForm: FormGroup;
  JobID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private JobsService: JobsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setForm();
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

  public setForm() {
    this.editForm = this.fb.group({
      id: [this.job.id],
      jobName: [this.job.jobName, Validators.required],
      code: [this.job.code, ""],
      description: [this.job.description, ""],
    });
  }
}
