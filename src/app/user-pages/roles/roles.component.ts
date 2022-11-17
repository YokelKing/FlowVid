import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IRole } from 'src/app/shared/models/role';
import { UserPagesService } from '../user-pages.services';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
public roles : IRole[];
editRoleForm : FormGroup;
editRoleID;
closeResult: string;
popoverTitle = 'Delete Confirm?';
popoverMessage= 'Are you sure you want to delete? This process cannot be undone.';
confirmClick = false;
cancelClick = false;

  constructor(private modalService: NgbModal,
    private userService : UserPagesService,
    private fb : FormBuilder,
    private router : Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadRoles();
  }

  initForm(){
    this.editRoleForm = this.fb.group ({
      name: '',
      roleName: ''
    })
  }
  loadRoles(){
    this.userService.getRoles().subscribe(
      result => {
        this.roles = result;
        console.log(result)
      }, error => {
        console.log(error);
      }
    )
  }

  // Update Roles

  editRole(role: IRole): void {
    this.router.navigate(['/user-pages/role-create/' + role.id]);
  }

  deleteRole(data: IRole) : void {
    this.userService.deleteRole(data)
    .subscribe(
      (data) =>    data,      
      err => console.log("role deleted")
    );
    this.roles = this.roles.filter(r => r.id !== data.id)

  }

  open(content) {
    this.modalService.open(content,
       {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }

}

