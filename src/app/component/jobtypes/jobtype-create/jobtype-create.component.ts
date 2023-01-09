
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IJobtype } from 'src/app/shared/models/jobtypes';
import { JobtypesService } from '../jobtypes.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-jobtype-create',
  templateUrl: './jobtype-create.component.html',
  styleUrls: ['./jobtype-create.component.scss']
})
export class JobtypeCreateComponent implements OnInit {

  [x: string]: any;
  title: string;
  jobtype: IJobtype;
  closeResult: string;
  jobtypeForm!: FormGroup;
  JobtypeID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private jobtypeService: JobtypesService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {  this.jobtype = {} as IJobtype;}

  ngOnInit(): void {

    this.jobtypeForm = this.fb.group({
      name: ['', Validators.required],
      code: ['']
    });

    this.jobtypeForm = new FormGroup({
      name: new FormControl(this.jobtype.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      code: new FormControl(this.jobtype.code, [
        Validators.maxLength(10),
      ]),

    });
    this.loadData();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.jobtypeForm.controls;
  }

  loadData() {

    this.title = "Add new ";

  }

  get name() {
    return this.jobtypeForm.get('name')!;
  }

  get code() {
    return this.jobtypeForm.get('code')!;
  }

  addNewJobtype() {

    if (this.jobtypeForm.invalid || this.isSubmitted) {
      for (const control of Object.keys(this.jobtypeForm.controls)) {
        this.jobtypeForm.controls[control].markAsTouched();
      }
      return;
    }
    this.isSubmitted = true;
    this.jobtypeService.createJobtype
      (this.jobtypeForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Jobtype has been created',
          showConfirmButton: false,
          timer: 1500
        })


        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/jobtypes/jobtypes-list']);
        });

      }, error => {
        this.isSubmitted = false;
      });
    this.jobtypeForm.reset();
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
