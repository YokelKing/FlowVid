import { Component, OnInit, ViewChild } from "@angular/core";
import { IUser } from "src/app/shared/models/user";
import { UserPagesService } from "../user-pages.services";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
@Component({
  selector: "app-users-list",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  users: IUser[];
  public displayedColumns: string[] = [
    "name",
    "username",
    "email",
    "status",
    "createdDate",
    "action",
  ];
  dataSource: MatTableDataSource<IUser>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private accountService: UserPagesService) {}

  ngOnInit() {
    this.loadUser();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  loadUser() {
    this.accountService.loadAllUser().subscribe(
      (result) => {
        this.users = result;
        this.dataSource = new MatTableDataSource(result);
        // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
