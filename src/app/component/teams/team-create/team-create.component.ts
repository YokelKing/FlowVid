
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITeam } from 'src/app/shared/models/teams';
import { TeamsService } from '../teams.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss']
})
export class TeamCreateComponent implements OnInit {

  [x: string]: any;
  title: string;
  team: ITeam;
  closeResult: string;
  teamForm!: FormGroup;
  TeamID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private teamService: TeamsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {  this.team = {} as ITeam;}

  ngOnInit(): void {

    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      code: [''],
      type: ['']
    });

    this.teamForm = new FormGroup({
      name: new FormControl(this.team.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      code: new FormControl(this.team.code, [
        Validators.maxLength(10),
      ]),
      type: new FormControl(this.team.type, [
        Validators.maxLength(10),
      ]),

    });
    this.loadData();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.teamForm.controls;
  }

  loadData() {

    this.title = "Add new ";

  }

  get name() {
    return this.teamForm.get('name')!;
  }

  get code() {
    return this.teamForm.get('code')!;
  }
  get type() {
    return this.teamForm.get('type')!;
  }

  addNewTeam() {

    if (this.teamForm.invalid || this.isSubmitted) {
      for (const control of Object.keys(this.teamForm.controls)) {
        this.teamForm.controls[control].markAsTouched();
      }
      return;
    }
    this.isSubmitted = true;
    this.teamService.createTeam
      (this.teamForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Team has been created',
          showConfirmButton: false,
          timer: 1500
        })


        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/teams/teams-list']);
        });

      }, error => {
        this.isSubmitted = false;
      });
    this.teamForm.reset();
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

}
