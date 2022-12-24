import { Component, OnInit, ViewChild } from "@angular/core";
import { IProgress } from "src/app/shared/models/progress";
import { ProgressService } from "../progress.service";
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
import { ProgressEditComponent } from "../progress-edit/progress-edit.component";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-progress-list",
  templateUrl: "./progress-list.component.html",
  styleUrls: ["./progress-list.component.scss"],
})
export class ProgressListComponent implements OnInit {
  progress: IProgress[];
  public displayedColumns: string[] = [
    "id",
    "name",
    "code",
    "status",
    "createdDate",
    "action",
  ];
  dataSource: MatTableDataSource<IProgress>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Progress: IProgress;
  closeResult: string;
  progressForm: FormGroup;
  id;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private progressService: ProgressService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProgress();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.progressForm.controls;
  }

  loadProgress() {
    this.progressService.getAllProgresss().subscribe(
      (result) => {
        console.log(result);
        this.progress = result;
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

  editProgress(data: IProgress): void {
    const ref = this.modalService.open(ProgressEditComponent, {
      centered: true,
    });
    ref.componentInstance.progress = data;

    ref.result.then(
      (yes) => {
        console.log("Yes Click");

        this.loadProgress();
      },
      (cancel) => {
        console.log("Cancel Click");
      }
    );
  }
  deleteProgress(data: IProgress): void {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {

        this.progressService.deleteProgress(data).subscribe((data) => data);

        this.progress = this.progress.filter((r) => r.id !== data.id);
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

