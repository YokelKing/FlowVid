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
import { IResource } from "src/app/shared/models/resources";
import {ResourcesService} from "../resources.service"
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-resource-edit",
  templateUrl: "./resource-edit.component.html",
  styleUrls: ["./resource-edit.component.scss"],
})
export class ResourceEditComponent implements OnInit {
  title: string;
  resource: IResource;
  closeResult: string;
  editForm: FormGroup;
  ResourceID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private ResourcesService: ResourcesService,
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

  editResource() {
    if (this.editForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.ResourcesService
      .updateResource(this.resource.id, this.editForm.value)
      .subscribe(
        (x) => {
          this.isSubmitted = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Resource has been updated',
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
      id: [this.resource.id],
      name: [this.resource.name, Validators.required],
      code: [this.resource.code, ""],
    });
  }
}
