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
import { IProgress } from "src/app/shared/models/progress";
import {ProgressService} from "../progress.service"
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-progress-edit",
  templateUrl: "./progress-edit.component.html",
  styleUrls: ["./progress-edit.component.scss"],
})
export class ProgressEditComponent implements OnInit {
  title: string;
  progress: IProgress;
  closeResult: string;
  editForm: FormGroup;
  ProgressID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private progressService: ProgressService,
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

  editProgress() {
    if (this.editForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.progressService
      .updateProgress(this.progress.id, this.editForm.value)
      .subscribe(
        (x) => {
          this.isSubmitted = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'JobIssueProgress has been updated',
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
      id: [this.progress.id],
      name: [this.progress.name, Validators.required],
      code: [this.progress.code, ""],
    });
  }
}
