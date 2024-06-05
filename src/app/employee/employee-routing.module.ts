import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmplistComponent } from './emplist/emplist.component';
import { AddempComponent } from './addemp/addemp.component';
import { EditempComponent } from './editemp/editemp.component';

const routes: Routes = [
  //localhost:4200/employee
  { path: '', component: EmplistComponent },
  //localhost:4200/employee/addemp
  {path:'addemp',component:AddempComponent},
  //localhost:4200/employee/editemp/1
  {path:'editemp/:id',component:EditempComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
