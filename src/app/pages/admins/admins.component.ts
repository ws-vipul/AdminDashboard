import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [
    HttpClientModule, NgFor
  ],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})

export class AdminsComponent implements OnInit{

  private getJsonValue : any;
  private postJsonValue : any;
  private responsePayload: any;
  public allAdmins: any;


  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.fetchAllAdminsList();
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
            console.log(this.allAdmins)
        }

    })

  }

}
