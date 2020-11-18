


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/@shared/apiservice.service';
import { APIENUM } from 'src/app/@shared/enum';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
Login: FormGroup;
  error:any;
  success:any;
  loading=false;
  constructor(  private _fb:FormBuilder,    private Api:ApiserviceService,private router:Router ) { }

  ngOnInit() {

    this.Login= this._fb.group({
      Username:['',[Validators.required]],
      Password:['',[Validators.required]],

    });
  }
  get Username(){
    return this.Login.get('Username');
  }

  get Password(){
    return this.Login.get('Password');
  }

   SignIn(){
     this.loading=true;
    this.Login.disable();

    this.Api.Create(APIENUM.LOGIN,this.Login.value).subscribe((res:any)=>{
      this.loading=false;
      this.success=res.message;
      sessionStorage.setItem('jwt',res.Token);
      this.Api.setUser(res.Token);
      console.log(res);
      this.router.navigateByUrl('main/user-profile');

   },err=>{
    this.loading=false;

    if (err.status === 0 && err.error instanceof ProgressEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('Client side error:', err.error);
      this.error='Client side error:'+err.error;
    }
     this.error=err.error.message;
     this.Login.enable();
     setTimeout(()=>{

      this.error='';


    },500)

   },()=>{
    setTimeout(()=>{
      this.success='';
      this.error='';
      this.Login.reset();
      this.Login.enable();
    },900)


   })

  }


}
