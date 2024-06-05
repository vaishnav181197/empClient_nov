import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.component.html',
  styleUrls: ['./emplist.component.css']
})
export class EmplistComponent implements OnInit{

  cdate:any=new Date()
  searchKey:string=""

  employees:any=[]

  constructor(private api:ApiService,private toastr:ToastrService){
    console.log(this.employees)

  }

  ngOnInit() {
    console.log("hhhh")
    this.api.getEmployees().subscribe({
      next:(res:any)=>{
        console.log(res)
        this.getData(res)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  getData(emp:any){
    this.employees=emp
    console.log(this.employees)
  }

  deleteEmp(id:any){
    this.api.deleteEmployee(id).subscribe({
      next:(res:any)=>{
        this.toastr.success("Employee Deleted Successfully")
        this.ngOnInit()
      },
      error:(err:any)=>{
        console.log(err)
        this.toastr.error("Delete Operation Failed!!")
      }
    })
  }

  sortById(){
    this.employees.sort((item1:any,item2:any)=>
      Number(item2.id)-Number(item1.id)
    )
    console.log(this.employees)
  }

  sortByName(){
    this.employees.sort((item1:any,item2:any)=>(
      item1.username.localeCompare(item2.username)
    ))
  }

  generatePdf(){
    const doc=new jsPDF()
    const body:any=this.employees.map((item:any)=>{
      const res:any=[]
      res.push(item.id)
      res.push(item.username)
      res.push(item.email)
      res.push(item.status)
      return res
    })
    console.log(body)
    autoTable(doc,{
      head:[['ID','Username','Email','Status']],
      body
    })


    doc.save('table.pdf')


  }

}
