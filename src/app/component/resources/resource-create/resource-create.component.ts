
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IResource } from 'src/app/shared/models/resources';
import { ResourcesService } from '../resources.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-resource-create',
  templateUrl: './resource-create.component.html',
  styleUrls: ['./resource-create.component.scss']
})
export class ResourceCreateComponent implements OnInit {

  [x: string]: any;
  title: string;
  resource: IResource;
  closeResult: string;
  resourceForm!: FormGroup;
  ResourceID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private resourceService: ResourcesService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {  this.resource = {} as IResource;}

  ngOnInit(): void {

    this.resourceForm = this.fb.group({
      name: ['', Validators.required],
      code: ['']
    });

    this.resourceForm = new FormGroup({
      name: new FormControl(this.resource.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      code: new FormControl(this.resource.code, [
        Validators.maxLength(10),
      ]),

    });
    this.loadData();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.resourceForm.controls;
  }

  loadData() {

    this.title = "Add new ";

  }

  get name() {
    return this.resourceForm.get('name')!;
  }

  get code() {
    return this.resourceForm.get('code')!;
  }

  addNewResource() {

    if (this.resourceForm.invalid || this.isSubmitted) {
      for (const control of Object.keys(this.resourceForm.controls)) {
        this.resourceForm.controls[control].markAsTouched();
      }
      return;
    }
    this.isSubmitted = true;
    this.resourceService.createResource
      (this.resourceForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Resource has been created',
          showConfirmButton: false,
          timer: 1500
        })


        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/resources/resources-list']);
        });

      }, error => {
        this.isSubmitted = false;
      });
    this.resourceForm.reset();
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
