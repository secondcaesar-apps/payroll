import { Injectable } from '@angular/core';
import { APIENUM } from './enum';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { JwtHelperService } from "@auth0/angular-jwt";
const helper:JwtHelperService = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  apiUrl = environment.url;
  list = [];

  constructor(private _http: HttpClient, ) { }



  Approve(type: APIENUM, data: any) {


    return this._http.post(this.apiUrl + 'leave/approve.php', data);

  }
  readbyEmployeeID(type: APIENUM, data: any) {


    return this._http.post(`${this.apiUrl}${type.toString()}/readbyEmployeeID.php`, data);

  }
  approvetrain(type: APIENUM, data: any) {


    return this._http.post(`${this.apiUrl}${type.toString()}/approve.php`, data);

  }

  Create(type: APIENUM, data: any) {


    return this._http.post(`${this.apiUrl}${type.toString()}/create.php`, data);

  }
  BLnk(type: APIENUM, data: any) {


    return this._http.post(`${this.apiUrl}${type.toString()}`, data);

  }


  Login(type: APIENUM, data: any) {


    return this._http.post(`${this.apiUrl}${type.toString()}/login.php`, data);

  }
  Update(type: APIENUM, data: any) {

    return this._http.post(`${this.apiUrl}${type.toString()}/update.php`, data);

  }


  Read(type: APIENUM) {


    return this._http.post(`${this.apiUrl}${type.toString()}/read.php`, {});

  }
  Genderreport(type: APIENUM) {


    return this._http.post(`${this.apiUrl}${type.toString()}/genderreport.php`, {});

  }
  ReadOne(type:APIENUM,data:any,){


    return this._http.post(`${this.apiUrl}${type.toString()}/read_one.php`,data);
  
    }
      ReadLeave(type:APIENUM,data:any,){


    return this._http.post(`${this.apiUrl}${type.toString()}/readoneemployee.php`,data);
  
    }
  MontlyRead(data: any, type: APIENUM) {


    return this._http.post(`${this.apiUrl}${type.toString()}/monthlyread.php`, data);

  }
  Yearlyreport(data: any, type: APIENUM) {


    return this._http.post(`${this.apiUrl}${type.toString()}/yearlyreport.php`, data);

  }
 EmployeeSalaryRead(data: any, type: APIENUM) {


    return this._http.post(`${this.apiUrl}${type.toString()}/employeeread`, data);

  }
  EmployeeRead(type: APIENUM, data: any) {


    return this._http.post(`${this.apiUrl}${type.toString()}/employeeread`, data);

  }
  SalaryComponentRead(data: any, type: APIENUM) {


    return this._http.post(`${this.apiUrl}${type.toString()}/salarycomponentread.php`, data);

  }
  Delete(type: APIENUM, id: any) {

    let value = 'AssetID';

    switch (type) {
      case APIENUM.ASS:
        value = 'AssetID';
        break;
      case APIENUM.CON:
        value = 'ContactID';
        break;
      case APIENUM.COM:
        value = 'CompanyID';
        break;
      case APIENUM.DES:
        value = 'DesignationID';
        break;
      case APIENUM.CAT:
        value = 'CategoryID';
        break;
      case APIENUM.DEPT:
        value = 'DepartmentID';
        break;

      case APIENUM.LOC:
        value = 'LocationsID';
        break;
      case APIENUM.MENU:
        value = 'MenuID';
        break;
      case APIENUM.MENUG:
        value = 'ID';
        break;
      case APIENUM.ROLE:
        value = 'RoleID';
        break;
      case APIENUM.INCR:
        value = 'AssetID';
        break;

      case APIENUM.EXP:
        value = 'AssetID';
        break;

      case APIENUM.LOG:
        value = 'AssetID';
        break;
    }







    return this._http.post(`${this.apiUrl}/ ${type}/delete.php`, { value: id });
  }

  ImageUpload(F) {

    console.log(F);
    const formData = new FormData();
    formData.append('upfile', F);

    return this._http.post(this.apiUrl + APIENUM.FILE, formData);
  }

  populatePayRoll() {
    return this._http.post(this.apiUrl + APIENUM.POPULATEPAYROLL, {});
  }
  populateApprove(data: any,type: APIENUM) {
    return this._http.post(`${this.apiUrl}${type.toString()}/populateapprove.php`, data);
  }
  createPayslip(data) {
    return this._http.post(this.apiUrl + APIENUM.CREATEPAYROLL, data);
  }

  App(type: APIENUM, data: any) {
    return this._http.post(`${this.apiUrl}${type.toString()}/approve.php`, data);
  }


  setUser(resp:any) {
    // sessionStorage.setItem('EmpID', resp.name);
    // sessionStorage.setItem('RoleID', resp.access_token);
    const helper = new JwtHelperService();
 
    const decodedToken = helper.decodeToken(resp);
    const expirationDate = helper.getTokenExpirationDate(resp);
    const isExpired = helper.isTokenExpired(resp);

    console.log(isExpired);

     sessionStorage.setItem('EmpID', decodedToken.data.EmployeeID);
     
     sessionStorage.setItem('RoleID', decodedToken.data.RoleID);
     sessionStorage.setItem('Email', decodedToken.data.Email);
    // sessionStorage.setItem('RoleID', resp.access_token);
  
  }
 
  // Checking if token is set
  isLoggedIn() {
    return sessionStorage.getItem('jwt') != null;
  }
 

}
