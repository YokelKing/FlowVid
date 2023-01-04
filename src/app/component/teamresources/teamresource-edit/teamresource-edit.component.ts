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
import { ITeamresource } from "src/app/shared/models/teamresources";
import {TeamresourcesService} from "../teamresources.service"
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-teamresource-edit",
  templateUrl: "./teamresource-edit.component.html",
  styleUrls: ["./teamresource-edit.component.scss"],
})
export class TeamresourceEditComponent implements OnInit {
  title: string;
  teamresource: ITeamresource;
  closeResult: string;
  editForm: FormGroup;
  TeamresourceID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private TeamresourcesService: TeamresourcesService,
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

  editTeamresource() {
    if (this.editForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.TeamresourcesService
      .updateTeamresource(this.teamresource.id, this.editForm.value)
      .subscribe(
        (x) => {
          this.isSubmitted = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Teamresource has been updated',
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
      id: [this.teamresource.id],
      name: [this.teamresource.name, Validators.required],
      code: [this.teamresource.code, ""],
      type: [this.teamresource.type, ""],
    });
  }
}
