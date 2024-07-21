import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [HttpClientModule, NgFor],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.css'
})
export class OperatorsComponent {
  private getJsonValue : any;
  private postJsonValue : any;
  private responsePayload: any;
  public allOperators: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.fetchAllOperatorsList();
  }

  OnAdminsFetch() {
    this.fetchAllOperatorsList();
  }

  fetchAllOperatorsList() {

    this.http.get('/dashboard/get/all/operators')
    .subscribe((response) => {

        this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
            this.responsePayload = this.getJsonValue.payload
            this.allOperators = this.responsePayload 
            console.log(this.allOperators)
        }

    })

  }

}
