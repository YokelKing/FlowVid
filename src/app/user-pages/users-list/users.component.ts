import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user';
import { UserPagesService } from '../user-pages.services';

@Component({
  selector: 'app-users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
users: IUser[];
  constructor(private accountService : UserPagesService) { }

  ngOnInit() {
    this. loadUser();
  }

  loadUser(){
    this.accountService.loadAllUser().subscribe(
      result => {
        this.users = result;
        console.log(result)
      }, error => {
        console.log(error);
      }
    )
  }
}
