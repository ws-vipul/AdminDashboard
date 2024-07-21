import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HttpClientModule, NgFor],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {


  private getJsonValue : any;
  private postJsonValue : any;
  private responsePayload: any;
  public allUsers: any;


  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.fetchAllUsersList();
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

}
