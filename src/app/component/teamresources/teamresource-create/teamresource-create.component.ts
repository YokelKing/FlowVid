
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITeamresource } from 'src/app/shared/models/teamresources';
import { TeamresourcesService } from '../teamresources.service';
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
    private teamResourceService: TeamresourcesService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {  this.teamresource = {} as ITeamresource;}

  ngOnInit(): void {

    this.teamresourceForm = this.fb.group({
      name: ['', Validators.required],
      code: [''],
      type: ['']
    });

    this.teamresourceForm = new FormGroup({
      name: new FormControl(this.teamresource.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      code: new FormControl(this.teamresource.code, [
        Validators.maxLength(10),
      ]),
      type: new FormControl(this.teamresource.type, [
        Validators.maxLength(10),
      ]),

    });
    this.loadData();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.teamresourceForm.controls;
  }

  loadData() {

    this.title = "Add new ";

  }

  get name() {
    return this.teamresourceForm.get('name')!;
  }

  get code() {
    return this.teamresourceForm.get('code')!;
  }
  get type() {
    return this.teamresourceForm.get('type')!;
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
