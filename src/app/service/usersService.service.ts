import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class usersServiceService {

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get('https://reqres.in/api/users?page=2')
   
  }

  getUsers2(){
    return this.http.get("https://reqres.in/api/unknown")
  }

  singleUser(id:any){
    return this.http.get(`https://reqres.in/api/users/${id}`)
  }
  
  createcontact(pageno: any){
    return this.http.post('https://reqres.in/api/users',pageno)
  }

  update(pageno: any){
    return this.http.put('https://reqres.in/api/users',pageno)
  }
  
  delete(id: any){
    return this.http.delete('https://reqres.in/api/users/2')
  }
}





