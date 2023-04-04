
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../Core/core.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {

empForm:FormGroup;



 education:string[] =[
  'Matriculation',
  'Diploma',
  'Intermediate',
  'Graduate',
  'PostGraduate'

 ];

 constructor(
  private _fb:FormBuilder,
  private _empService:EmployeeService,
  private _refDialog:MatDialogRef<EmpAddEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any,
  private _coreService:CoreService
  ){
  this.empForm = this._fb.group({
    firstName:'',
    lastName:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    package:'',
    experience:''
  })
  
 }

 ngOnInit(): void {
   this.empForm.patchValue(this.data);
 }
 onFormSubmit()
 {
  if(this.empForm.valid)
  {
    if(this.data)
    {
      console.log(this.empForm.value);
      this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
        next:(val:any)=>{
      
        this._coreService.openSnackBar("Employee Details Updated Successfully !");
 
        this._refDialog.close(true);
        },
        error:(err:any) =>{
          console.error(err);
        }
      })
    }
    else{
      console.log(this.empForm.value);
      this._empService.addEmployee(this.empForm.value).subscribe({
        next:(val:any)=>{

        this._coreService.openSnackBar("Employee Added Successfully !");
        this._refDialog.close(true);
        },
        error:(err:any) =>{
          console.error(err);
        }
      })
    }
   
  }
 }
}
