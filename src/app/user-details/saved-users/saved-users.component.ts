import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { NgForm } from "@angular/forms";
import { UserDetailService } from 'src/app/shared/user-detail.service';
import { UserDetail } from "src/app/shared/user-detail.model";
import { ToastrService } from "ngx-toastr";
import{users} from 'src/datamodel/users.model';


@Component({
  selector: 'app-saved-users',
  templateUrl: './saved-users.component.html',
  styles: [
  ]
})
export class SavedUsersComponent implements OnInit {
  public showModal : boolean;

  users : users[]=[];
  firstname : string;
  lastname : string;
  uemail : string;
  phone : string;
  
  constructor(public service : UserDetailService,
    private toastr:ToastrService, private http : HttpClient) { }

  ngOnInit(): void {
    this.service.refreshlist();
    this.users=[]; 
  }

  Search(){
    if (this.firstname!=""){
      this.service.list = this.service.list.filter(res => {
        return res.userFirstName.toLocaleLowerCase().includes(this.firstname.toLocaleLowerCase());
      });
      }else if(this.firstname == "" ){
      this.service.refreshlist();
    }
  }

  Searcha(){
    if (this.lastname!=""){
      this.service.list = this.service.list.filter(res => {
        return res.userLastName.toLocaleLowerCase().includes(this.lastname.toLocaleLowerCase());
      });
      }else if(this.lastname == "" ){
      this.service.refreshlist();
    }
  }

  Searchb(){
    if (this.uemail!=""){
      this.service.list = this.service.list.filter(res => {
        return res.userEmail.toLocaleLowerCase().includes(this.uemail.toLocaleLowerCase());
      });
      }else if(this.uemail == "" ){
      this.service.refreshlist();
    }
  }

  Searchc(){
    if (this.phone!=""){
      this.service.list = this.service.list.filter(res => {
        return res.userPhone.toLocaleLowerCase().includes(this.phone.toLocaleLowerCase());
      });
      }else if(this.phone == "" ){
      this.service.refreshlist();
    }
  }

  updateForm(id:number){

    this.service.getUser(id).toPromise().then(res => 
    {this.service.formData = res as UserDetail},
    err => {
      this.showModal=false;
      this.toastr.error("Sorry, this user appears to be missing: " + err.statusText,"ERROR:" + err.status);console.log(err);
      this.service.refreshlist();
    });

    }


  onSubmit(form:NgForm){

      this.updateRecord(form); 
      this.showModal=false;
              
  }

  updateRecord(form:NgForm){
    this.service.putUserDetail().subscribe(
      res =>{
           this.resetForm(form);
           this.service.refreshlist();
           this.toastr.info('Updated Successfully','User Management')
           
      },
      err => {this.toastr.error("Sorry, server returns following error: " + err.statusText,"ERROR:" + err.status);
        console.log(err);} 
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
      err=>{
        this.toastr.error("Sorry, this user appears to be missing : " + err.statusText,"ERROR:" + err.status);
      console.log(err);
      this.service.refreshlist();
      }
      
    )

    }
 
}

}