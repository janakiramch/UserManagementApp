import { Injectable } from '@angular/core';
import { UserDetail } from './user-detail.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor(private http:HttpClient) { }

  formData: UserDetail = new UserDetail();
  readonly baseURL='http://localhost:51845/api/UserDetail'
  list : UserDetail[];


  postUserDetail(){
    return this.http.post(this.baseURL, this.formData);
  }

  putUserDetail(){
    return this.http.put(`${this.baseURL}/${this.formData.userDetailId}`, this.formData);
  }

  deleteUserDetail(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshlist(){
    this.http.get(this.baseURL)
    .toPromise()
    .then(res =>this.list = res as UserDetail[]);
  }








}
