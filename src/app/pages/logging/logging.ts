import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-logging',
  imports: [CommonModule,FormsModule,HttpClientModule,NgIf],
  templateUrl: './logging.html',
  styleUrl: './logging.css',
})
export class Logging {
  public user={
    username:undefined,
    password:undefined
  }
  constructor(private authservice:Auth,private router:Router){}
  
  public log(){
    console.log(this.user);
    this.authservice.login(this.user).subscribe((data)=>{

      console.log("Logging Response is : ",data);
       
      this.router.navigate(['/add-employee']);
    },
    (error)=>{
      console.error("Logging Failed",error);
    }
  );
    
  }
}
