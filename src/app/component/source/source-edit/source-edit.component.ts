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
import { ISource } from "src/app/shared/models/source";
import {SourceService} from "../source.service"
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-source-edit",
  templateUrl: "./source-edit.component.html",
  styleUrls: ["./source-edit.component.scss"],
})
export class SourceEditComponent implements OnInit {
  title: string;
  source: ISource;
  closeResult: string;
  editForm: FormGroup;
  SourceID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private SourceService: SourceService,
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

  editSource() {
    if (this.editForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.SourceService
      .updateSource(this.source.id, this.editForm.value)
      .subscribe(
        (x) => {
          this.isSubmitted = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Job Source has been updated',
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
      id: [this.source.id],
      name: [this.source.name, Validators.required],
      code: [this.source.code, ""],
    });
  }
}
