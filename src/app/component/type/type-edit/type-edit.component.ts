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
import { IType } from "src/app/shared/models/type";
import {TypesService} from "../type.service"
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-type-edit",
  templateUrl: "./type-edit.component.html",
  styleUrls: ["./type-edit.component.scss"],
})
export class TypeEditComponent implements OnInit {
  title: string;
  type: IType;
  closeResult: string;
  editForm: FormGroup;
  TypeID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private TypesService: TypesService,
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

  editType() {
    if (this.editForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.TypesService
      .updateType(this.type.id, this.editForm.value)
      .subscribe(
        (x) => {
          this.isSubmitted = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'JobIssueType has been updated',
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
      id: [this.type.id],
      name: [this.type.name, Validators.required],
      code: [this.type.code, ""],
    });
  }
}
