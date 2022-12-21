
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDivision } from 'src/app/shared/models/divisions';
import { DivisionsService } from '../divisions.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-division-create',
  templateUrl: './division-create.component.html',
  styleUrls: ['./division-create.component.scss']
})
export class DivisionCreateComponent implements OnInit {

  [x: string]: any;
  title: string;
  division: IDivision;
  closeResult: string;
  divisionForm!: FormGroup;
  DivisionID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private divisionService: DivisionsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { this.division = {} as IDivision; }

  ngOnInit(): void {

    this.divisionForm = this.fb.group({
      name: ['', Validators.required],
      code: [''],
      type: ['']
    });

    this.divisionForm = new FormGroup({
      name: new FormControl(this.division.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      code: new FormControl(this.division.code, [
        Validators.maxLength(20),
      ]),
      type: new FormControl(this.division.type, [
        Validators.maxLength(20),
      ]),

    });


    this.loadData();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.divisionForm.controls;
  }

  loadData() {

    this.title = "Add new ";

  }

  get name() {
    return this.divisionForm.get('name')!;
  }

  get code() {
    return this.divisionForm.get('code')!;
  }
  get type() {
    return this.divisionForm.get('type')!;
  }


  addNewDivision() {

    if (this.divisionForm.invalid || this.isSubmitted) {
      for (const control of Object.keys(this.divisionForm.controls)) {
        this.divisionForm.controls[control].markAsTouched();
      }
      return;
    }
    this.isSubmitted = true;
    this.divisionService.createDivision
      (this.divisionForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Division has been created',
          showConfirmButton: false,
          timer: 1500
        })


        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/divisions/divisions-list']);
        });

      }, error => {
        this.isSubmitted = false;
      });
    this.divisionForm.reset();
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
