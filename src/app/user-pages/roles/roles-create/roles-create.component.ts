import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IRole } from 'src/app/shared/models/role';
import { UserPagesService } from '../../user-pages.services';

@Component({
  selector: 'app-roles-create',
  templateUrl: './roles-create.component.html',
  styleUrls: ['./roles-create.component.scss']
})
export class RolesCreateComponent implements OnInit {
  closeResult: string;
  roleForm : FormGroup;
  role: IRole;
  editRoleId;
  isSubmitted = false;
  constructor(private modalService: NgbModal,
    private userServices : UserPagesService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    public fb: FormBuilder) { }

  ngOnInit(): void {
    this.roleForm = this.fb.group({    
      name: ['', Validators.required],
      roleName: ['']
    })

    this.activatedRouter.paramMap.subscribe(p =>{
      this.editRoleId = p.get('id');
      this.getRole(this.editRoleId);
    })
  }

  get f(): {[key: string]: AbstractControl}{
    return this.roleForm.controls;
  }

private getRole(id : string){ 
  if(id){
    this.userServices.getRoleById(id).
    subscribe( data => {
      this.role = data;
      this.roleForm.patchValue(this.role);
    }, error => console.error(error)
    )
  }
}

AddRole(): void {
  this.isSubmitted = true;
  if(this.roleForm.invalid){
    return console.error(this.roleForm.value);
     }
    if(!this.editRoleId )
    {
      this.addNewRole();
    }
    else {this.editRole()}

}

private addNewRole(){
  this.userServices.createRole(this.roleForm.value)
  .subscribe(data => {
    this.router.navigate(['/user-pages/basic-elements']);
  }, error => console.log(error));
}

private editRole(): void {
  this.userServices.updateRole(this.editRoleId, this.roleForm.value).
  subscribe( () => {
    this.router.navigate(['/user-pages/basic-elements']);
  }, error => console.log(error))
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
