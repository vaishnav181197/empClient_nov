import { Component } from '@angular/core';
import { ApiService } from '../employee/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  empCount:any=0

  constructor(private api:ApiService,private router:Router){
    this.getData()
  }

  getData(){
    this.api.getEmployees().subscribe({
      next:(res:any)=>{
        this.empCount=res.length
        console.log(this.empCount)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  logout(){
    sessionStorage.removeItem('admin')
    this.router.navigateByUrl('')
  }

}
