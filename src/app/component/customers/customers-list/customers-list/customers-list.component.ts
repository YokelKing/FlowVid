import { Component, OnInit, ViewChild } from "@angular/core";
import { ICustomer } from "src/app/shared/models/customers";
import { CustomersService } from "../../customers.service";
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
import { CustomerEditComponent } from "../../customer-edit/customer-edit/customer-edit.component";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-customers-list",
  templateUrl: "./customers-list.component.html",
  styleUrls: ["./customers-list.component.scss"],
})
export class CustomersListComponent implements OnInit {
  customers: ICustomer[];
  public displayedColumns: string[] = [
    "id",
    "name",
    "code",
    "status",
    "createdDate",
    "action",
  ];
  dataSource: MatTableDataSource<ICustomer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  customer: ICustomer;
  closeResult: string;
  customerForm: FormGroup;
  id;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private customerService: CustomersService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.editSetForm();
    this.loadCustomers();

    // const id = this.route.snapshot.params['id'];
    //this.setForm();
    //console.log("adfadsf",id);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  //get editFormData() { return this.customerForm.controls; }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe(
      (result) => {
        console.log(result);
        this.customers = result;
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

  editCustomer(data: ICustomer): void {
    //this.router.navigate([`customers/cust-create/${data.id}`]);
    //const ref = this.modalService.open(CustomerCreateComponent,{centered:true}) ;

    //ref.componentInstance.customer = data;
    //ref.result.then((yes) =>{
    //console.log("Ok");
    //this.loadCustomers();
    //},(cancel) =>{
    //console.log("Cancel")
    //})

    const ref = this.modalService.open(CustomerEditComponent, {
      centered: true,
    });
    ref.componentInstance.customer = data;

    ref.result.then(
      (yes) => {
        console.log("Yes Click");

        this.loadCustomers();
      },
      (cancel) => {
        console.log("Cancel Click");
      }
    );
  }
  // private setForm() {
  //   // console.log(this.customer);
  //   // this.editCustomerForm = this.fb.group({
  //   //   id: [0],
  //   //   name: ['', Validators.required],
  //   //   code: ['']
  //   // });

  //   this.customerService.getCustomerById(id).subscribe(x => {
  //     this.customer = x
  //     this.customerForm = this.fb.group({
  //       id: [this.customer.id],
  //       name: [this.customer.name, Validators.required],
  //       code: [this.customer.code, Validators.required],
  //     });

  //   });

  // }

  // editCustomerById(id: any) {
  //   this.customerService.getCustomerById(id).subscribe(
  //     data => {
  //       console.log(data);

  //       this.editCustomerForm.get('id')?.setValue(data.id);
  //       this.editCustomerForm.get('name')?.setValue(data.name);
  //       this.editCustomerForm.get('code')?.setValue(data.code);
  //     });
  //     this.loadCustomers();

  // }
  // deleteCustomer(data: ICustomer): void {
  //   if (confirm("Are you sure to delete?")) {
  //     // Initialize Params Object

  //     this.customerService.deleteCustomer(data).subscribe(
  //       (data) => data,
  //       (err) => console.log(data.name + "has not been deleted")
  //     );
  //     //sweetalert message popup
  //     Swal.fire({
  //       title: "Hurray!!",
  //       text: "User has been deleted successfully",
  //       icon: "success",
  //     });
  //     this.customers = this.customers.filter((r) => r.id !== data.id);
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 2000);
  //   }
  // }



  deleteCustomer(data: ICustomer): void {

    Swal.fire({  
      title: 'Are you sure want to remove?',  
      text: 'You will not be able to recover this file!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, delete it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) { 
        this.customerService.deleteCustomer(data);

        this.customerService.deleteCustomer(data).subscribe(
                (data) => data
              );

        this.customers = this.customers.filter((r) => r.id !== data.id);
        Swal.fire(  
          'Deleted!',  
          'Your imaginary file has been deleted.',  
          'success'  
        )  

        setTimeout(() => {
        window.location.reload();
      }, 2000);
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelled',  
          'Your imaginary file is safe :)',  
          'error'  
        )  
      }  
    })  

}


}

