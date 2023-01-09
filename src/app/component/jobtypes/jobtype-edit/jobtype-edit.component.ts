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
import { IJobtype } from "src/app/shared/models/jobtypes";
import {JobtypesService} from "../jobtypes.service"
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-jobtype-edit",
  templateUrl: "./jobtype-edit.component.html",
  styleUrls: ["./jobtype-edit.component.scss"],
})
export class JobtypeEditComponent implements OnInit {
  title: string;
  jobtype: IJobtype;
  closeResult: string;
  editForm: FormGroup;
  JobtypeID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private JobtypesService: JobtypesService,
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

  editJobtype() {
    if (this.editForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.JobtypesService
      .updateJobtype(this.jobtype.id, this.editForm.value)
      .subscribe(
        (x) => {
          this.isSubmitted = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Jobtype has been updated',
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
      id: [this.jobtype.id],
      name: [this.jobtype.name, Validators.required],
      code: [this.jobtype.code, ""],
    });
  }
}
