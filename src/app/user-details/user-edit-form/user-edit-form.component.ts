import { NgForm } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/shared/user-detail.service';
import { UserDetail } from "src/app/shared/user-detail.model";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styles: [
  ]
})
export class UserEditFormComponent implements OnInit {

  public showModal :boolean;
  

  constructor(public service: UserDetailService,
    private toastr:ToastrService) { }

  
    

  ngOnInit(): void {
  }
  


  onSubmit(form:NgForm){
    if(this.service.formData.userDetailId==0)
    this.insertRecord(form);
    else
    this.updateRecord(form);         
  }

  insertRecord(form : NgForm){
    this.service.postUserDetail().subscribe(
      res =>{
           this.resetForm(form);
           this.service.refreshlist();
           this.toastr.success('Submitted Successfully','User Management')
           
      },
      err => {console.log(err);} 
    );
  }

  

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


}
