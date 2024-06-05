import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = ""
  password: string = ""
  user: any = {}

  constructor(private toastr: ToastrService, private admin: AdminService,private router:Router) { }

  handleLogin() {
    console.log(this.email, this.password)
    if (this.email && this.password) {
      const result = this.admin.getAdmin()
      result.subscribe({
        next: (res: any) => {
          if (this.email == res.email && this.password == res.password) {
            this.toastr.success("Login SuccessFull!!")
            this.email = ""
            this.password = ""
            sessionStorage.setItem('admin',JSON.stringify(res))
            this.router.navigateByUrl('home')

          }
          else {
            this.toastr.error("Login Failed")
          }
        },
        error: (err) => {
          console.log(err)
        }
      })

    } else {
      // alert("Invalid Email and Password")
      this.toastr.warning("Invalid Email or Password!!")
    }
  }

}
