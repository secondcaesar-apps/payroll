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
    this.Login.disable();
   
    this.Api.Create(APIENUM.LOGIN,this.Login.value).subscribe((res:any)=>{
      this.success=res.message;
      sessionStorage.setItem('jwt',res.Token);
      console.log(res.jwt);
      this.router.navigateByUrl('main/dashboard');

   },err=>{
     this.error=err.error.message;
     this.Login.enable();
   

   },()=>{
     setTimeout(()=>{
       this.success='';
       this.error='';
       this.Login.reset();
       this.Login.enable();
     },500)

 
   })

  }
}
