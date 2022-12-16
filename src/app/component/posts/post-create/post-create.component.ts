
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPost } from 'src/app/shared/models/posts';
import { PostsService } from '../posts.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  [x: string]: any;
  title: string;
  post: IPost;
  closeResult: string;
  postForm: FormGroup;
  PostID?: number;
  isSubmitted = false;
  constructor(
    public modal: NgbActiveModal,
    private postService: PostsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
    this.loadData();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.postForm.controls;
  }

  loadData() {

    this.title = "Add new ";

  }


  addNewPost() {

    if (this.postForm.invalid || this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;
    this.postService.createPost
      (this.postForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Post has been created',
          showConfirmButton: false,
          timer: 1500
        })


        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/posts/posts-list']);
        });

      }, error => {
        this.isSubmitted = false;
      });
    this.postForm.reset();
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
