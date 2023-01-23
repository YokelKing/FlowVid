import { Component, OnInit, ViewChild } from "@angular/core";
import { IPriority } from "src/app/shared/models/priority";
import { PriorityService } from "../priority.service";
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
import { PriorityEditComponent } from "../priority-edit/priority-edit.component";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-priority-list",
  templateUrl: "./priority-list.component.html",
  styleUrls: ["./priority-list.component.scss"],
})
export class PriorityListComponent implements OnInit {
  priority: IPriority[];
  public displayedColumns: string[] = [
    "id",
    "name",
    "code",
    "status",
    "createdDate",
    "action",
  ];
  dataSource: MatTableDataSource<IPriority>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Priority: IPriority;
  closeResult: string;
  priorityForm: FormGroup;
  id;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private priorityService: PriorityService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPriority();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.priorityForm.controls;
  }

  loadPriority() {
    this.priorityService.getAllPriority().subscribe(
      (result) => {
        
        this.priority = result;
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

  editPriority(data: IPriority): void {
    const ref = this.modalService.open(PriorityEditComponent, {
      centered: true,
    });
    ref.componentInstance.priority = data;

    ref.result.then(
      (yes) => {
        console.log("Yes Click");

        this.loadPriority();
      },
      (cancel) => {
        console.log("Cancel Click");
      }
    );
  }
  deletePriority(data: IPriority): void {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {

        this.priorityService.deletePriority(data).subscribe((data) => data);

        this.priority = this.priority.filter((r) => r.id !== data.id);
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

