import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [HttpClientModule, NgFor, ReactiveFormsModule],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.css'
})
export class OperatorsComponent {
  private getJsonValue : any;
  private postJsonValue : any;
  private responsePayload: any;
  public allOperators: any;

  public operatorLogs: any;

  postOperatorForm : any;
  postEditOperatorForm : any;
  operatorDetails: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.fetchAllOperatorsList();

    this.postOperatorForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      mobNum: '',
      password: '',
      operatorId: '1000'
    })

    this.postEditOperatorForm = this.formBuilder.group({
      editFirstName: '',
      editLastName: '',
      editEmail: '',
      editMobNum: '',
    })
  }

  OnOperatorsFetch() {
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


  crateOperator() {
    const postOperator = this.postOperatorForm.value
    this.http.post('/dashboard/register/operator', postOperator).subscribe((response) => {
        this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
          window.location.reload()
        }
      }
    );
  }

  fetchOperatorDetails(id : number) {


    this.http.get('/dashboard/get/operator/details/' + id)
    .subscribe((response) => {

        this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
            console.log(response);
            let payload = this.getJsonValue.payload
            this.postEditOperatorForm = this.formBuilder.group({
              editFirstName: payload.firstName,
              editLastName: payload.lastName,
              editEmail: payload.email,
              editMobNum: payload.mobNum,
            })
        }

    })

  }

  fetchOperatorLogs(id: number) {
    this.http.get('/dashboard/get/operator/activity/logs/' + id)
    .subscribe((response) => {

        this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
            console.log(response);
            this.operatorLogs = this.getJsonValue.payload
            
        }

    })
  }

  editOperator() {
    const postEditOperator = this.postEditOperatorForm.value;
    this.http.post('/dashboard/register/operator', postEditOperator).subscribe((response) => {
        this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
          window.location.reload()
        }
      }
    );
  }

  deleteOperator(id : number) {

    console.log('printing :' + id)
    let deleteOperatorForm = {
      userOperatorId : id,
      reason: 'Testing',
      operatorId: 1000
    }

    this.http.put('dashboard/delete/operator', deleteOperatorForm).subscribe((response) => {
      this.getJsonValue = response

        if (this.getJsonValue.status === "success") {
          window.location.reload()
        }
    })
  }

}
