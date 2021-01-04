import { Component, OnInit } from '@angular/core';

import { NgForm } from "@angular/forms";
import { UserDetailService } from 'src/app/shared/user-detail.service';
import { UserDetail } from "src/app/shared/user-detail.model";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-saved-users',
  templateUrl: './saved-users.component.html',
  styles: [
  ]
})
export class SavedUsersComponent implements OnInit {
  public showModal : boolean;

  
  constructor(public service : UserDetailService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshlist();
  }

  populateForm(selectedRecord:UserDetail){
    this.service.formData=Object.assign({},selectedRecord);
  }

  onSubmit(form:NgForm){
    /*if(this.service.formData.userDetailId==0)
    this.insertRecord(form);
    else*/
    this.updateRecord(form); 
    this.showModal=false;
            
  }

  /*insertRecord(form : NgForm){
    this.service.postUserDetail().subscribe(
      res =>{
           this.resetForm(form);
           this.service.refreshlist();
           this.toastr.success('Submitted Successfully','User Management')
           
      },
      err => {console.log(err);} 
    );
  }*/

  updateRecord(form:NgForm){
    this.service.putUserDetail().subscribe(
      res =>{
           this.resetForm(form);
           this.service.refreshlist();
           this.toastr.info('Updated Successfully','User Management')
           
      },
      err => {console.log(err);} 
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData= new UserDetail();
  }

 


  onDelete(id: number){
    if(confirm('Are u sure to delete this record?'))
    {
      this.service.deleteUserDetail(id)
    .subscribe(
      res=>{
        this.service.refreshlist();
        this.toastr.error("Deleted Successfully",'User Management');
      },
      err=>{console.log(err)}
    )

    }

  }

}
