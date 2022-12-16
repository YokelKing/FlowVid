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
import { IDivision } from "src/app/shared/models/divisions";
import {DivisionsService} from "../divisions.service"
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-division-edit",
  templateUrl: "./division-edit.component.html",
  styleUrls: ["./division-edit.component.scss"],
})
export class DivisionEditComponent implements OnInit {
  name: string;
  division: IDivision;
  closeResult: string;
  editForm: FormGroup;
  DivisionID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private DivisionsService: DivisionsService,
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

  editDivision() {
    if (this.editForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.DivisionsService
      .updateDivision(this.division.id, this.editForm.value)
      .subscribe(
        (x) => {
          this.isSubmitted = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Division has been updated',
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
      id: [this.division.id],
      name: [this.division.name, Validators.required],
      code: [this.division.code, ""],
      type: [this.division.type, ""],
    });
  }
}
