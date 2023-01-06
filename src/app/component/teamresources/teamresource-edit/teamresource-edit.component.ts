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
import { TeamsService } from "../../teams/teams.service";
import { ResourcesService } from "../../resources/resources.service";

import { ITeam } from "src/app/shared/models/teams";
import { IResource } from "src/app/shared/models/resources";


@Component({
  selector: "app-teamresource-edit",
  templateUrl: "./teamresource-edit.component.html",
  styleUrls: ["./teamresource-edit.component.scss"],
})
export class TeamresourceEditComponent implements OnInit {
  title: string;
  teams: ITeam[];
  resources: IResource[];
  teamresource: ITeamresource;
  closeResult: string;
  editForm: FormGroup;
  TeamresourceID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,    
    private TeamsService: TeamsService,
    private resourceService: ResourcesService,
    private TeamresourcesService: TeamresourcesService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setForm();    
    this.loadTeams();
    this.loadResources();
  }

  get editFormData() {
    return this.editForm.controls;
  }



  loadTeams() {
    this.TeamsService.getAllTeams().subscribe(
      (result) => {
        this.teams = result;
        console.log("myteam",result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadResources() {
    this.resourceService.getAllResources().subscribe(
      (result) => {
        this.resources = result;
        console.log("myresources",result);
      },
      (error) => {
        console.log(error);
      }
    );
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
      teamId: [this.teamresource.teamId, Validators.required],
      resourceId: [this.teamresource.resourceId, Validators.required],
    });
  }


  changeTeam(e) {
    console.log(e.value)
    this.teamId.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeResource(e) {
    console.log(e.value)
    this.resourceId.setValue(e.target.value, {
      onlySelf: true
    })
  }

     // Getter method to access formcontrols
     get teamId() {
      return this.editForm.get('teamId');
    }

    
       // Getter method to access formcontrols
   get resourceId() {
    return this.editForm.get('resourceId');
  }

}
