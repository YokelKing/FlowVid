import { Component, OnInit, ViewChild } from "@angular/core";
import { IType } from "src/app/shared/models/type";
import { TypesService } from "../type.service";
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
import { TypeEditComponent } from "../type-edit/type-edit.component";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-type-list",
  templateUrl: "./type-list.component.html",
  styleUrls: ["./type-list.component.scss"],
})
export class TypeListComponent implements OnInit {
  type: IType[];
  public displayedColumns: string[] = [
    "id",
    "name",
    "code",
    "status",
    "createdDate",
    "action",
  ];
  dataSource: MatTableDataSource<IType>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Type: IType;
  closeResult: string;
  typeForm: FormGroup;
  id;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private typeService: TypesService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadType();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.typeForm.controls;
  }

  loadType() {
    this.typeService.getAllTypes().subscribe(
      (result) => {
        console.log(result);
        this.type = result;
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

  editResource(data: IType): void {
    const ref = this.modalService.open(TypeEditComponent, {
      centered: true,
    });
    ref.componentInstance.type = data;

    ref.result.then(
      (yes) => {
        console.log("Yes Click");

        this.loadType();
      },
      (cancel) => {
        console.log("Cancel Click");
      }
    );
  }
  deleteResource(data: IType): void {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
       // this.typeService.deleteType(data);

        this.typeService.deleteType(data).subscribe((data) => data);

        this.type = this.type.filter((r) => r.id !== data.id);
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

