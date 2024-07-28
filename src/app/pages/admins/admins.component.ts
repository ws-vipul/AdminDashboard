import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [
    HttpClientModule, NgFor, ReactiveFormsModule
  ],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})

export class AdminsComponent implements OnInit{

  private getJsonValue : any;
  
  private responsePayload: any;
  public allAdmins: any;
  public adminLogs: any;

  postAdminForm : any;
  postEditAdminForm : any;
  adminDetails: any;

  constructor(private http: HttpClient, 
    private formBuilder: FormBuilder) 
    { }

  ngOnInit(): void {
    this.fetchAllAdminsList();

    this.postAdminForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      mobNum: '',
      password: '',
      adminId: '1000'
    })

    this.postEditAdminForm = this.formBuilder.group({
      editFirstName: '',
      editLastName: '',
      editEmail: '',
      editMobNum: '',
    })
  }

  OnAdminsFetch() {
    this.fetchAllAdminsList();
  }

  fetchAllAdminsList() {

    this.http.get('/dashboard/get/all/admins')
    .subscribe((response) => {

        this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
            this.responsePayload = this.getJsonValue.payload
            this.allAdmins = this.responsePayload 
        }

    })

  }

  crateAdmin() {
    const postAdmin = this.postAdminForm.value
    this.http.post('/dashboard/register/admin', postAdmin).subscribe((response) => {
        this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
          window.location.reload()
        }
      }
    );
  }

  fetchAdminDetails(id : number) {


    this.http.get('/dashboard/get/admin/details/' + id)
    .subscribe((response) => {

        this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
            console.log(response);
            let payload = this.getJsonValue.payload
            this.postEditAdminForm = this.formBuilder.group({
              editFirstName: payload.firstName,
              editLastName: payload.lastName,
              editEmail: payload.email,
              editMobNum: payload.mobNum,
            })
        }

    })

  }

  fetchAdminLogs(id: number) {
    this.http.get('/dashboard/get/admin/activity/logs/' + id)
    .subscribe((response) => {

        this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
            console.log(response);
            this.adminLogs = this.getJsonValue.payload
            
        }

    })
  }

  editAdmin() {
    const postEditAdmin = this.postEditAdminForm.value;
    this.http.post('/dashboard/register/admin', postEditAdmin).subscribe((response) => {
        this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
          window.location.reload()
        }
      }
    );
  }

  deleteAdmin(id : number) {

    console.log('printing :' + id)
    let deleteAdminForm = {
      userAdminId : id,
      reason: 'Testing',
      adminId: 1000
    }

    this.http.put('dashboard/delete/admin', deleteAdminForm).subscribe((response) => {
      this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
          window.location.reload()
        }
    })
  }


}
