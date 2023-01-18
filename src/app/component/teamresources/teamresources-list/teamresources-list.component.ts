import { Component, OnInit, ViewChild } from "@angular/core";
import { ITeamresource } from "src/app/shared/models/teamresources";
import { TeamresourcesService } from "../teamresources.service";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TeamresourceEditComponent } from "../teamresource-edit/teamresource-edit.component";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { TeamsService } from "../../teams/teams.service";
@Component({
  selector: "app-teamresources-list",
  templateUrl: "./teamresources-list.component.html",
  styleUrls: ["./teamresources-list.component.scss"],
})
export class TeamresourcesListComponent implements OnInit {
  teamresources: ITeamresource[];
  public displayedColumns: string[] = [
    "id",
    "name",
    "code",
    "status",
    "createdDate",
    "action",
  ];
  dataSource: MatTableDataSource<ITeamresource>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  teamresource: ITeamresource;

  teams:any;
  closeResult: string;
  teamresourceForm: FormGroup;
  id;
  isSubmitted = false;

  constructor(
    private TeamsService: TeamsService,
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private teamresourceService: TeamresourcesService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTeamresources();    
    this.loadTeams();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.teamresourceForm.controls;
  }

  loadTeams() {
    this.TeamsService.getAllTeams().subscribe(
      (result) => {
        this.teams = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadTeamresources() {
    this.teamresourceService.getAllTeamresources().subscribe(
      (result) => {
        
        this.teamresources = result;
        this.dataSource = new MatTableDataSource(result);
        // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editTeamresource(data: ITeamresource): void {
    const ref = this.modalService.open(TeamresourceEditComponent, {
      centered: true,
    });

   // console.log("Team",data);
    ref.componentInstance.teamresource = data;

    ref.result.then(
      (yes) => {
        console.log("Yes Click");
        this.loadTeams()
        this.loadTeamresources();
      },
      (cancel) => {
        console.log("Cancel Click");
      }
    );
  }
  deleteTeamresource(data: ITeamresource): void {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        //this.teamresourceService.deleteTeamresource(data);

        this.teamresourceService.deleteTeamresource(data).subscribe((data) => data);

        this.teamresources = this.teamresources.filter((r) => r.id !== data.id);
        Swal.fire(
          "Deleted!",
          "Your imaginary file has been deleted.",
          "success"
        );

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  }
}

