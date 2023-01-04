import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl, HTTP_OPTIONS } from 'src/app/apps/guards/api.url';
import { ICustomer } from 'src/app/shared/models/customers';


const customerUrl = baseUrl + 'Customers';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  
  constructor(private http: HttpClient,
    private router: Router) {     
    }

    getAllCustomers(){
      return this.http.get<ICustomer[]>(customerUrl);
    }

    getCustomerById(id){
      return this.http.get<ICustomer>(`${customerUrl}/${id}`);
    }

    createCutsomer(data){
      return this.http.post<ICustomer>(customerUrl, data);
    }

    updateCustomer(id, data){
      return this.http.put<ICustomer>(`${customerUrl}/${id}`, data);
    }

    deleteCustomer(data){
      return this.http.delete(`${customerUrl}/${data.id}`);
    }
}
