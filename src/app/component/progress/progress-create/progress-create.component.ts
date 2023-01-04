
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProgress } from 'src/app/shared/models/progress';
import { ProgressService } from '../progress.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-progress-create',
  templateUrl: './progress-create.component.html',
  styleUrls: ['./progress-create.component.scss']
})
export class ProgressCreateComponent implements OnInit {

  [x: string]: any;
  title: string;
  progress: IProgress;
  closeResult: string;
  progressForm!: FormGroup;
  ProgressID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private progressService: ProgressService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {  this.progress = {} as IProgress;}

  ngOnInit(): void {

    this.progressForm = this.fb.group({
      name: ['', Validators.required],
      code: ['']
    });

    this.progressForm = new FormGroup({
      name: new FormControl(this.progress.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      code: new FormControl(this.progress.code, [
        Validators.maxLength(10),
      ]),

    });
    this.loadData();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.progressForm.controls;
  }

  loadData() {

    this.title = "Add new ";

  }

  get name() {
    return this.progressForm.get('name')!;
  }

  get code() {
    return this.progressForm.get('code')!;
  }

  addNewProgress() {

    if (this.progressForm.invalid || this.isSubmitted) {
      for (const control of Object.keys(this.progressForm.controls)) {
        this.progressForm.controls[control].markAsTouched();
      }
      return;
    }
    this.isSubmitted = true;
    this.progressService.createProgress
      (this.progressForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'JobIssueProgress has been created',
          showConfirmButton: false,
          timer: 1500
        })


        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/progress/progress-list']);
        });

      }, error => {
        this.isSubmitted = false;
      });
    this.progressForm.reset();
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
