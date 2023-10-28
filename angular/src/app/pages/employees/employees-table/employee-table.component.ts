import { HttpErrorResponse } from '@angular/common/http';
import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/service/data-service.service';
import { EmployeeFormComponent } from '../employees-form/employees-form.component';


@Component({
  selector: 'employee',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],

})
export class EmployeeComponent {

  config:any ={}

 displayColumn = ['Name', 'Father Name', 'CNIC', 'Email','Phone','Address','Actions']
 columsList = ['fName', 'fatherName', 'nic', 'emailOffice','phone','address', 'Actions']

 constructor(public dialog: MatDialog, private dataService: DataService) { }

 ngOnInit() {

  this.getAllEmployees();
  
 }

onTableSignal(action) {
  
  if (action.action == 'addNew') {this.addForm()}
  else if(action.action == 'delete') {console.log(action.action)}
  else if(action.action == 'edit') {this.onEdit(action.data)}
  else if(action.action == 'refresh') {this.getAllEmployees()}
}

addForm() {
    const dialogPosition = {
      top: 30 + 'px',
    };

    const config =  {
      height: '90vh',
      width: '36%',
      panelClass: 'custom-modalbox',
      disableClose: false,
      position: dialogPosition,
    }
    const dialogRef = this.dialog.open(EmployeeFormComponent , config);
    dialogRef.afterClosed().subscribe(result => {
      this.getAllEmployees();
    });
  }

  onEdit(data) {

    const dialogPosition = {
      top: 30 + 'px',
    };

    const config =  {
      height: '90vh',
      width: '36%',
      panelClass: 'custom-modalbox',
      disableClose: false,
      position: dialogPosition,
      data: data
    }
    const dialogRef = this.dialog.open(EmployeeFormComponent , config);
    dialogRef.afterClosed().subscribe(result => {
      this.getAllEmployees();
    });

  }

  addActions(){
    const actions = ['edit']
    this.config['tableList'].forEach(element => {
      element['Actions'] = actions
    });
  }

  getAllEmployees(){

    const url = `/user/getEmployees`;
 
    this.dataService.get(url).then((resp: any) => {

      this.config['tableList']=resp;
      this.config['displayColumn']=this.displayColumn;
      this.config['columns']=this.columsList;
      this.config['titel'] = 'Employees';
      this.addActions();

    }, (err: HttpErrorResponse) => {
        console.log(err);
    });

  }

}
