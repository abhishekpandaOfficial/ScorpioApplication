import { Component, OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './Core/core.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  displayedColumns: string[] = 
  ['id',
  'firstName', 
  'lastName',
  'gender',
  'email',
  'dob',
  'education',
  'experience',
  'package',
  'company',
  'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog:MatDialog,
     private _empService:EmployeeService,
     private _coreService:CoreService){}
 ngOnInit(): void {
   
  this.getEmployeeLists();
 }
  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){

        }this.getEmployeeLists();
      }
    })
  }
  getEmployeeLists(){
    this._empService.getEmployeeList().subscribe({
      next:(res)=>{
       console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
deleteEmployee(id:number)
{
  this._empService.deleteEmployee(id).subscribe({
    next:(res)=>{
      this._coreService.openSnackBar("Employee Deleted Successfully!",'done')
      this.getEmployeeLists();
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openEditEmpForm(data:any){
    const dialogRef = this._dialog.open(EmpAddEditComponent,{
      data:data
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){

        }this.getEmployeeLists();
      }
    })
  }
}
