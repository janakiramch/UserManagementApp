import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../shared/user-detail.model';
import { UserDetailService } from '../shared/user-detail.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styles: [
  ]
})
export class UserDetailsComponent implements OnInit {
 public showModal : boolean;
 
  
  constructor(public service : UserDetailService,
    private toastr:ToastrService) { }

  ngOnInit(): void{
    this.service.refreshlist();
  }

  populateForm(selectedRecord:UserDetail){
    this.service.formData=Object.assign({},selectedRecord);
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

  onSubmit(form:NgForm){
    if(this.service.formData.userDetailId==0)
  
    this.insertRecord(form);
    this.showModal=false;
  
  
    /*else
    this.updateRecord(form); */        
  }

  insertRecord(form : NgForm){
    this.service.postUserDetail().subscribe(
      res =>{
           this.resetForm(form);
           this.service.refreshlist();
           this.toastr.success('Submitted Successfully','User Detail Register')
           
      },
      err => {console.log(err);} 
    );
  }

  addUser(form:NgForm){
    this.resetForm(form);
    this.showModal=true;
  }

 /* updateRecord(form:NgForm){
    this.service.putUserDetail().subscribe(
      res =>{
           this.resetForm(form);
           this.service.refreshlist();
           this.toastr.info('Updated Successfully','User Detail Register')
      },
      err => {console.log(err);} 
    );
  }*/

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData= new UserDetail();
  }
  
}


