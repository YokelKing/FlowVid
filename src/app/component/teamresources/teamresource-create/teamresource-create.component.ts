
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITeamresource } from 'src/app/shared/models/teamresources';
import { TeamresourcesService } from '../teamresources.service';
import { TeamsService } from "../../teams/teams.service";
import { ResourcesService } from "../../resources/resources.service";

//import { CustomersService } from '../../customers/customers.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-teamresource-create',
  templateUrl: './teamresource-create.component.html',
  styleUrls: ['./teamresource-create.component.scss']
})
export class TeamresourceCreateComponent implements OnInit {

  [x: string]: any;
  title: string;
  teamresource: ITeamresource;
  closeResult: string;
  teamresourceForm!: FormGroup;
  TeamresourceID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private TeamsService: TeamsService,
    private resourceService: ResourcesService,
    private teamResourceService: TeamresourcesService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {  this.teamresource = {} as ITeamresource;}

  ngOnInit(): void {

    this.teamresourceForm = this.fb.group({
      teamId: ['', Validators.required],
      resourceId: ['', Validators.required]
    });

    this.teamresourceForm = new FormGroup({
      teamId: new FormControl(this.teamresource.teamId, [
        Validators.required,
      ]),
      resourceId: new FormControl(this.teamresource.resourceId, [
        Validators.required,
      ]),

    });
    this.loadData();
    
    this.loadTeams();
    this.loadResources();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.teamresourceForm.controls;
  }

  loadData() {

    this.title = "Add new ";

  }

  get teamId() {
    return this.teamresourceForm.get('teamId')!;
  }

  get resourceId() {
    return this.teamresourceForm.get('resourceId')!;
  }


  addNewTeamresource() {

    if (this.teamresourceForm.invalid || this.isSubmitted) {
      for (const control of Object.keys(this.teamresourceForm.controls)) {
        this.teamresourceForm.controls[control].markAsTouched();
      }
      return;
    }
    this.isSubmitted = true;
    this.teamResourceService.createTeamresource
      (this.teamresourceForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Teamresource has been created',
          showConfirmButton: false,
          timer: 1500
        })


        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/teamresources/teamresources-list']);
        });

      }, error => {
        this.isSubmitted = false;
      });
    this.teamresourceForm.reset();
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

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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


}
