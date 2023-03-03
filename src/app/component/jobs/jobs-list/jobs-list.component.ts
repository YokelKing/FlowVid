import { Component, OnInit, ViewChild } from "@angular/core";
import { IJob } from "src/app/shared/models/jobs";
import { JobsService } from "../jobs.service";
import {
  NgbModal,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { IDateFilterParams } from "ag-grid-community";
@Component({
  selector: "app-jobs-list",
  templateUrl: "./jobs-list.component.html",
  styleUrls: ["./jobs-list.component.scss"],
})
export class JobsListComponent implements OnInit {
 jobDetails: any = {};
  jobs: IJob[];
  rowData: any = [];
  
  dataSource: MatTableDataSource<IJob>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  job: IJob;
  closeResult: string;
  jobForm: FormGroup;
  id;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private jobService: JobsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.jobForm.controls;
  }

  loadJobs() {
    debugger;
    this.jobService.getAllJobs().subscribe(
      (result) => {
        this.jobs = result;
        this.rowData = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editJob(data: IJob): void {
this.router.navigate(['jobs/job-create/' + data.id]);
  }
  deleteJob(data: IJob): void {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        //this.jobService.deleteJob(data);

        this.jobService.deleteJob(data).subscribe((data) => data);

        this.jobs = this.jobs.filter((r) => r.id !== data.id);
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

  actionCellRenderer(params) {
    let eGui = document.createElement("div");
  
    let editingCells = params.api.getEditingCells();
    // checks if the rowIndex matches in at least one of the editing cells
    let isCurrentRowEditing = editingCells.some((cell) => {
      return cell.rowIndex === params.node.rowIndex;
    });
  
    if (isCurrentRowEditing) {
      eGui.innerHTML = `
          <button  
            class="btn-primary action-button update"
            data-action="update">
                 update  
          </button>
          <button  
            class="btn-danger action-button cancel"
            data-action="cancel">
                 cancel
          </button>
          `;
    } else {
      eGui.innerHTML = `
          <button 
            class="btn-primary action-button edit"  
            data-action="edit">
            Edit
            </button>
          <button 
            class="btn-danger text-white action-button delete"
            data-action="delete">
               Delete
          </button>
          `;
    }
  
    return eGui;
  }
  createdDateFormatter(params) {
    const date = new Date(params.data.dateOpend);
    //const date = new Date();
    return date.getDate() + '/' +  (date.getMonth()+1) + '/' + date.getFullYear();
  }
  dueDateFormatter(params) {
    const date = new Date(params.data.dateDue);
    return date.getDate() + '/' +  (date.getMonth()+1) + '/' + date.getFullYear();
  }
  closedDateFormatter(params) {
    const date = new Date(params.data.dateClosed);
    return date.getDate() + '/' +  (date.getMonth()+1) + '/' + date.getFullYear();
  }

  filterParams: IDateFilterParams = {
    comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
      var dateAsString = cellValue;
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split('/');
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
      return 0;
    },
    minValidYear: 2000,
    maxValidYear: 2021,
    inRangeFloatingFilterDateFormat: 'Do MMM YYYY',
  };
  gridOptions = {
    pagination: true,
    suppressClickEdit: false,
    onCellClicked(params) {
      // Handle click event for action cells
      if (params.column.colId === "action" && params.event.target.dataset.action) {
        let action = params.event.target.dataset.action;
  
        if (action === "edit") {
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            // gets the first columnKey
            colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
          });
        }
  
        if (action === "delete") {
          params.api.applyTransaction({
            remove: [params.node.data]
          });
        }
  
        if (action === "update") {
          params.api.stopEditing(false);
        }
  
        if (action === "cancel") {
          params.api.stopEditing(true);
        }
      }
    },
  
    onRowEditingStarted: (params) => {
      params.api.refreshCells({
        columns: ["action"],
        rowNodes: [params.node],
        force: true
      });
    },
    onRowEditingStopped: (params) => {
      params.api.refreshCells({
        columns: ["action"],
        rowNodes: [params.node],
        force: true
      });
    },
    editType: "fullRow",
    columnDefs: [
      {headerName: 'Id', field: 'id' },
      {headerName: 'Description', field: 'description' },
      {headerName: 'Customer', field: 'customer.name'},
      {headerName: 'Team', field: 'team.name'},
      {headerName: 'Resource', field: 'resource.name' },
      {headerName: 'Division', field: 'division.name' },
      {headerName: 'Job Asset', field: 'jobAsset.name'},
      {headerName: 'Job Issue Type', field: 'jobIssueType.name'},
      {headerName: 'Job Priority', field: 'jobPriority.name' },
      {headerName: 'Job Source', field: 'jobSource.name' },
      {headerName: 'Job Progress Status', field: 'jobProgressStatus.name'},
      {headerName: 'Job Type', field: 'jobType.name'},
      {headerName: 'External Ref No', field: 'externalRefNo' },
      // {headerName: 'Job Task', field: 'jobTask' },

      {
        headerName: 'Created Date', field: 'dateOpend',
        filter: 'agDateColumnFilter',
        filterParams: this.filterParams,
        valueFormatter: this.createdDateFormatter,
        editable: false
      },
      {
        headerName: 'Due Date', field: 'dateDue',
        filter: 'agDateColumnFilter',
        filterParams: this.filterParams,
        valueFormatter: this.dueDateFormatter,
        editable: false
      },
      {
        headerName: 'Closed Date', field: 'dateClosed',
        filter: 'agDateColumnFilter',
        filterParams: this.filterParams,
        valueFormatter: this.closedDateFormatter,
        editable: false
      },
      {
        headerName: "Action",
        minWidth: 150,
        cellRenderer: this.actionCellRenderer,
        editable: false,
        colId: "action"
      }
    ],
    defaultColDef: {
    sortable:true,
    rowSelection: 'multiple',
    groupSelectsChildren: true,
      editable: true,
      filter: 'agTextColumnFilter',
    floatingFilter: true,
    resizable: true,
    }
  };


}

