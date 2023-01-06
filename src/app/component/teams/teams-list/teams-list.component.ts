import { Component, OnInit, ViewChild } from "@angular/core";
import { ITeam } from "src/app/shared/models/teams";
import { TeamsService } from "../teams.service";
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
import { TeamEditComponent } from "../team-edit/team-edit.component";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-teams-list",
  templateUrl: "./teams-list.component.html",
  styleUrls: ["./teams-list.component.scss"],
})
export class TeamsListComponent implements OnInit {
  teams: ITeam[];
  public displayedColumns: string[] = [
    "id",
    "name",
    "code",
    "type",
    "status",
    "createdDate",
    "action",
  ];
  dataSource: MatTableDataSource<ITeam>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  team: ITeam;
  closeResult: string;
  teamForm: FormGroup;
  id;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private teamService: TeamsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.teamForm.controls;
  }

  loadTeams() {
    this.teamService.getAllTeams().subscribe(
      (result) => {
        console.log("asdf",result);
        this.teams = result;
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

  editTeam(data: ITeam): void {
    const ref = this.modalService.open(TeamEditComponent, {
      centered: true,
    });
    ref.componentInstance.team = data;

    ref.result.then(
      (yes) => {
        console.log("Yes Click");

        this.loadTeams();
      },
      (cancel) => {
        console.log("Cancel Click");
      }
    );
  }
  deleteTeam(data: ITeam): void {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        //this.teamService.deleteTeam(data);

        this.teamService.deleteTeam(data).subscribe((data) => data);

        this.teams = this.teams.filter((r) => r.id !== data.id);
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

