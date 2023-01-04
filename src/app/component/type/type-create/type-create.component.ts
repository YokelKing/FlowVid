
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IType } from 'src/app/shared/models/type';
import { TypesService } from '../type.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-type-create',
  templateUrl: './type-create.component.html',
  styleUrls: ['./type-create.component.scss']
})
export class TypeCreateComponent implements OnInit {

  [x: string]: any;
  title: string;
  type: IType;
  closeResult: string;
  typeForm!: FormGroup;
  TypeID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private typeService: TypesService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {  this.type = {} as IType;}

  ngOnInit(): void {

    this.typeForm = this.fb.group({
      name: ['', Validators.required],
      code: ['']
    });

    this.typeForm = new FormGroup({
      name: new FormControl(this.type.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      code: new FormControl(this.type.code, [
        Validators.maxLength(10),
      ]),

    });
    this.loadData();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.typeForm.controls;
  }

  loadData() {

    this.title = "Add new ";

  }

  get name() {
    return this.typeForm.get('name')!;
  }

  get code() {
    return this.typeForm.get('code')!;
  }

  addNewType() {

    if (this.typeForm.invalid || this.isSubmitted) {
      for (const control of Object.keys(this.typeForm.controls)) {
        this.typeForm.controls[control].markAsTouched();
      }
      return;
    }
    this.isSubmitted = true;
    this.typeService.createType
      (this.typeForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'JobIssueType has been created',
          showConfirmButton: false,
          timer: 1500
        })


        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/type/type-list']);
        });

      }, error => {
        this.isSubmitted = false;
      });
    this.typeForm.reset();
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
