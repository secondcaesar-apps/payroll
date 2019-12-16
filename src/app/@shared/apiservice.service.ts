import { Injectable } from '@angular/core';
import { APIENUM } from './enum';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  apiUrl = environment.url ;
  list=[];

  constructor(private _http:HttpClient,) { }




  Create(type:APIENUM,data:any){


    return this._http.post(`${this.apiUrl}${type.toString()}/create.php`,data);

  }

  Update(type:APIENUM,data:any){

    return this._http.post(`${this.apiUrl}${type.toString()}/update.php`,data);

  }


 Read(type:APIENUM){


  return this._http.post(`${this.apiUrl}${type.toString()}/read.php`,{});

  }


Delete(type:APIENUM,id:any){

 let  value='AssetID';

 switch (type) {
  case APIENUM.ASS:  
   value='AssetID';
      break;
case APIENUM.CON:
      value='ContactID';
      break;
case APIENUM.COM:
    value='CompanyID';
     break;
     case APIENUM.DES:
    value='DesignationID';
     break;
 case APIENUM.CAT:
              value='CategoryID';
              break;
  case APIENUM.DEPT:
        value='DepartmentID';
          break;

  case APIENUM.LOC:
          value='LocationsID';
          break;
  case APIENUM.MENU:
          value='MenuID';
          break;
  case APIENUM.MENUG:
          value='ID';
          break;
   case APIENUM.ROLE:
          value='RoleID';
          break;
  case APIENUM.INCR:
          value='AssetID';
          break;

  case APIENUM.EXP:
              value='AssetID';
     break;

     case APIENUM.LOG:
        value='AssetID';
break;
 }

 
 




  return this._http.post(`${this.apiUrl}/ ${type}/delete.php`,{value:id});
}


}
