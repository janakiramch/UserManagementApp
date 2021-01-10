import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../shared/user-detail.model';
import { UserDetailService } from '../shared/user-detail.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styles: [],
})

export class UserDetailsComponent implements OnInit {
  
  public showModal: boolean;
  constructor(
    public service: UserDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.service.refreshlist();
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.userDetailId == 0) 
    this.insertRecord(form);
    this.showModal = false;

  }

  insertRecord(form: NgForm) {
    this.service.postUserDetail().subscribe(
      (res) => {
        this.resetForm(form);
        this.service.refreshlist();
        this.toastr.success('Submitted Successfully', 'User Detail Register');
      },
      (err) => {
        console.log(err);
        this.toastr.error("Sorry, server returns following error: " + err.statusText,"ERROR:" + err.status);
      }
    );
  }

  addUser(form: NgForm) {
    this.resetForm(form);
    this.showModal = true;
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new UserDetail();
  }

}

