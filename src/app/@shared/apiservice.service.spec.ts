import { APIENUM } from './enum';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiserviceService } from './apiservice.service';
import { TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';


describe('ApiserviceService', () => {

let injector:TestBed;
  let Apiservice:ApiserviceService;
 let   _http:HttpClient;
 
 let httpTestingController: HttpTestingController;


  beforeEach(()=>{

    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[ApiserviceService]
    })
    injector = getTestBed();
   // httpTestingController = injector.get(HttpTestingController);
    Apiservice= injector.get(new ApiserviceService(_http)) ;

  })

  it('Create Endpoint with enum',()=>{
    let data={DepartmentName:'IT',Status:'Active'}
    let value = APIENUM.DEPT;
    Apiservice.Create(value,data).subscribe((res:any)=>{
      
      expect(res.Message).toBeTruthy();
    },err=>{
      expect(err.message).toThrowError();
    })
    
   // expect(Apiservice.Create(APIENUM.ASS,{}))
  })


 
});
