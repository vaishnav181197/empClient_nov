import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profilePicture:string="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  editProfile:any=false
  adminProfile:any={}

  onEdit(){
    this.editProfile=!this.editProfile
  }

  constructor(private admin:AdminService,private toastr:ToastrService){}

  ngOnInit() {
    this.admin.getAdmin().subscribe({
      next:(res:any)=>{
        // console.log(res)
        this.getData(res)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  getData(data:any){
      this.adminProfile=data
      console.log(this.adminProfile)
      if(this.adminProfile.profile){
        this.profilePicture=this.adminProfile.profile
      }
  }
  
  getFile(e:any){
    let file=e.target.files[0]
    let fr=new FileReader()
    fr.readAsDataURL(file)
    fr.onload=(event:any)=>{
      console.log(event.target.result)
      this.profilePicture=event.target.result
      this.adminProfile.profile=event.target.result
    }
  }

  onUpdate(){
    console.log(this.adminProfile)
    this.admin.updateAdmin(this.adminProfile).subscribe({
      next:(res:any)=>{
        this.toastr.success("Employee Updated Successfully!!")
        this.ngOnInit()
        this.onEdit()
      },
      error:(err:any)=>{
        this.toastr.error("Admin Details Updation Failed!!")
      }
    })
  }

}
