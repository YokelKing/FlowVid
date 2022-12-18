
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ILocation } from 'src/app/shared/models/locations';
import { LocationsService } from '../locations.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.scss']
})
export class LocationCreateComponent implements OnInit {

  [x: string]: any;
  title: string;
  location: ILocation;
  closeResult: string;
  locationForm: FormGroup;
  LocationID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private locationService: LocationsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.locationForm = this.fb.group({
      name: ['', Validators.required],
      postCode: ['']
    });
    this.loadData();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.locationForm.controls;
  }

  loadData() {

    this.title = "Add new ";

  }


  addNewLocation() {

    if (this.locationForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.locationService.createLocation
      (this.locationForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Location has been created',
          showConfirmButton: false,
          timer: 1500
        })


        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/locations/locations-list']);
        });

      }, error => {
        this.isSubmitted = false;
      });
    this.locationForm.reset();
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
