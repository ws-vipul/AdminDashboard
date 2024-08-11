import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HttpClientModule, NgFor, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {


  private getJsonValue : any;
  private postJsonValue : any;
  private responsePayload: any;
  public allUsers: any;

  public userLogs: any;
  postUserForm : any;
  postEditUserForm : any;
  userDetails: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.fetchAllUsersList();

    this.postUserForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      mobNum: '',
      password: '',
      userId: '1000'
    })

    this.postEditUserForm = this.formBuilder.group({
      editFirstName: '',
      editLastName: '',
      editEmail: '',
      editMobNum: '',
    })
  }

  OnUsersFetch() {
    this.fetchAllUsersList();
  }

  fetchAllUsersList() {

    this.http.get('/dashboard/get/all/users')
    .subscribe((response) => {
        
      this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
            this.responsePayload = this.getJsonValue.payload
            this.allUsers = this.responsePayload 
            console.log(this.allUsers)
        }

    })

  }

  crateUser() {
    const postUser = this.postUserForm.value
    this.http.post('/dashboard/register/user', postUser).subscribe((response) => {
        this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
          window.location.reload()
        }
      }
    );
  }

  fetchUserDetails(id : number) {


    this.http.get('/dashboard/get/user/details/' + id)
    .subscribe((response) => {

        this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
            console.log(response);
            let payload = this.getJsonValue.payload
            this.postEditUserForm = this.formBuilder.group({
              editFirstName: payload.firstName,
              editLastName: payload.lastName,
              editEmail: payload.email,
              editMobNum: payload.mobNum,
            })
        }

    })

  }

  fetchUserLogs(id: number) {
    this.http.get('/dashboard/get/user/activity/logs/' + id)
    .subscribe((response) => {

        this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
            console.log(response);
            this.userLogs = this.getJsonValue.payload
            
        }

    })
  }

  editUser() {
    const postEditUser = this.postEditUserForm.value;
    this.http.post('/dashboard/register/user', postEditUser).subscribe((response) => {
        this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
          window.location.reload()
        }
      }
    );
  }

  deleteUser(id : number) {

    console.log('printing :' + id)
    let deleteUserForm = {
      userUserId : id,
      reason: 'Testing',
      userId: 1000
    }

    this.http.put('dashboard/delete/user', deleteUserForm).subscribe((response) => {
      this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
          window.location.reload()
        }
    })
  }

}
