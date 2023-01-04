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
import { IPriority } from "src/app/shared/models/priority";
import {PriorityService} from "../priority.service"
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-priority-edit",
  templateUrl: "./priority-edit.component.html",
  styleUrls: ["./priority-edit.component.scss"],
})
export class PriorityEditComponent implements OnInit {
  title: string;
  priority: IPriority;
  closeResult: string;
  editForm: FormGroup;
  PriorityID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private PriorityService: PriorityService,
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

  editPriority() {
    if (this.editForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.PriorityService
      .updatePriority(this.priority.id, this.editForm.value)
      .subscribe(
        (x) => {
          this.isSubmitted = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Job Priority has been updated',
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
      id: [this.priority.id],
      name: [this.priority.name, Validators.required],
      code: [this.priority.code, ""],
    });
  }
}
