
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPriority } from 'src/app/shared/models/priority';
import { PriorityService } from '../priority.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-priority-create',
  templateUrl: './priority-create.component.html',
  styleUrls: ['./priority-create.component.scss']
})
export class PriorityCreateComponent implements OnInit {

  [x: string]: any;
  title: string;
  priority: IPriority;
  closeResult: string;
  priorityForm!: FormGroup;
  PriorityID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private priorityService: PriorityService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {  this.priority = {} as IPriority;}

  ngOnInit(): void {

    this.priorityForm = this.fb.group({
      name: ['', Validators.required],
      code: ['']
    });

    this.priorityForm = new FormGroup({
      name: new FormControl(this.priority.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      code: new FormControl(this.priority.code, [
        Validators.maxLength(10),
      ]),

    });
    this.loadData();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.priorityForm.controls;
  }

  loadData() {

    this.title = "Add new ";

  }

  get name() {
    return this.priorityForm.get('name')!;
  }

  get code() {
    return this.priorityForm.get('code')!;
  }

  addNewPriority() {

    if (this.priorityForm.invalid || this.isSubmitted) {
      for (const control of Object.keys(this.priorityForm.controls)) {
        this.priorityForm.controls[control].markAsTouched();
      }
      return;
    }
    this.isSubmitted = true;
    this.priorityService.createPriority
      (this.priorityForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Job Priority has been created',
          showConfirmButton: false,
          timer: 1500
        })


        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/priority/priority-list']);
        });

      }, error => {
        this.isSubmitted = false;
      });
    this.priorityForm.reset();
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
