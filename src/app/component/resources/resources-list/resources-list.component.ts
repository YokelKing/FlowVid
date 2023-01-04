import { Component, OnInit, ViewChild } from "@angular/core";
import { IResource } from "src/app/shared/models/resources";
import { ResourcesService } from "../resources.service";
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
import { ResourceEditComponent } from "../resource-edit/resource-edit.component";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-resources-list",
  templateUrl: "./resources-list.component.html",
  styleUrls: ["./resources-list.component.scss"],
})
export class ResourcesListComponent implements OnInit {
  resources: IResource[];
  public displayedColumns: string[] = [
    "id",
    "name",
    "code",
    "status",
    "createdDate",
    "action",
  ];
  dataSource: MatTableDataSource<IResource>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  resource: IResource;
  closeResult: string;
  resourceForm: FormGroup;
  id;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private resourceService: ResourcesService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadResources();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.resourceForm.controls;
  }

  loadResources() {
    this.resourceService.getAllResources().subscribe(
      (result) => {
        console.log(result);
        this.resources = result;
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

  editResource(data: IResource): void {
    const ref = this.modalService.open(ResourceEditComponent, {
      centered: true,
    });
    ref.componentInstance.resource = data;

    ref.result.then(
      (yes) => {
        console.log("Yes Click");

        this.loadResources();
      },
      (cancel) => {
        console.log("Cancel Click");
      }
    );
  }
  deleteResource(data: IResource): void {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        //this.resourceService.deleteResource(data);

        this.resourceService.deleteResource(data).subscribe((data) => data);

        this.resources = this.resources.filter((r) => r.id !== data.id);
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

