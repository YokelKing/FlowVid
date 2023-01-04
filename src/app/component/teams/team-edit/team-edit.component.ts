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
import { ITeam } from "src/app/shared/models/teams";
import {TeamsService} from "../teams.service"
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-team-edit",
  templateUrl: "./team-edit.component.html",
  styleUrls: ["./team-edit.component.scss"],
})
export class TeamEditComponent implements OnInit {
  title: string;
  team: ITeam;
  closeResult: string;
  editForm: FormGroup;
  TeamID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private TeamsService: TeamsService,
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

  editTeam() {
    if (this.editForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.TeamsService
      .updateTeam(this.team.id, this.editForm.value)
      .subscribe(
        (x) => {
          this.isSubmitted = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Team has been updated',
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
      id: [this.team.id],
      name: [this.team.name, Validators.required],
      code: [this.team.code, ""],
      type: [this.team.type, ""],
    });
  }
}
