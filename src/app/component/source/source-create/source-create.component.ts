
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISource } from 'src/app/shared/models/source';
import { SourceService } from '../source.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-source-create',
  templateUrl: './source-create.component.html',
  styleUrls: ['./source-create.component.scss']
})
export class SourceCreateComponent implements OnInit {

  [x: string]: any;
  title: string;
  source: ISource;
  closeResult: string;
  sourceForm!: FormGroup;
  SourceID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private sourceService: SourceService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {  this.source = {} as ISource;}

  ngOnInit(): void {

    this.sourceForm = this.fb.group({
      name: ['', Validators.required],
      code: ['']
    });

    this.sourceForm = new FormGroup({
      name: new FormControl(this.source.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      code: new FormControl(this.source.code, [
        Validators.maxLength(10),
      ]),

    });
    this.loadData();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.sourceForm.controls;
  }

  loadData() {

    this.title = "Add new ";

  }

  get name() {
    return this.sourceForm.get('name')!;
  }

  get code() {
    return this.sourceForm.get('code')!;
  }

  addNewSource() {

    if (this.sourceForm.invalid || this.isSubmitted) {
      for (const control of Object.keys(this.sourceForm.controls)) {
        this.sourceForm.controls[control].markAsTouched();
      }
      return;
    }
    this.isSubmitted = true;
    this.sourceService.createSource
      (this.sourceForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Job Source has been created',
          showConfirmButton: false,
          timer: 1500
        })


        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/source/source-list']);
        });

      }, error => {
        this.isSubmitted = false;
      });
    this.sourceForm.reset();
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
