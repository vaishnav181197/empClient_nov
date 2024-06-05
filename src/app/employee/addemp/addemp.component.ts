import { Component } from '@angular/core';
import { EmployeeSchema } from '../schemas/employeeSchema';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addemp',
  templateUrl: './addemp.component.html',
  styleUrls: ['./addemp.component.css']
})
export class AddempComponent {
  emp:EmployeeSchema={}

  constructor(private api:ApiService,private toastr:ToastrService,private router:Router){}

  handleSubmit(){
    console.log(this.emp)
    const {id,username,email,status}=this.emp
    if(!id || !username || !email || !status){
      this.toastr.warning("Enter Valid Inputs!!")
    }
    else{
      const result=this.api.addEmployee(this.emp)
      result.subscribe({
        next:(res:any)=>{
          console.log(res)
          this.toastr.success("Employee Added Successfully!!")
          this.emp={}
          this.router.navigateByUrl('employee')
        },
        error:(err:any)=>{
          console.log(err)
          this.toastr.error(err)
        }
      })
    }
  }

  onCancel(){
    this.emp={}
    this.router.navigateByUrl('employee')
  }
}
