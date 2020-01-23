import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { MessagesService } from './messages.service';
import { TodoFilterService } from './todo-filter.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private userDetails:any;
  private API_KEY = 'AIzaSyDm11ltHEGq2trpZp0LsK1Pi5dKiq18d4I';

  constructor(private http:HttpClient,
            private router:Router,
            private messageService:MessagesService,
            private todoFilter:TodoFilterService) { }

  signupUser(userData){
    this.messageService.activateSpinner();
    this.messageService.successMessage("Registration Process Started");
    this.userDetails = userData;
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.API_KEY,{
            email: userData.email,
            password:	userData.password,
            returnSecureToken: "true"
          }
        ).subscribe(response => this.addUser(response), this.showError);
  }

  addUser(response){
    return this.http.put("https://angular-todo-2f483.firebaseio.com/users/"+response.localId+".json",this.userDetails)
    .subscribe(
      resolve => {
        this.messageService.successMessage("SignUp Successful");
        this.router.navigate(['/auth/login'])
      }, this.showError) 
  }

  userLogin(userCredentials:{email:string, password:string}){
    localStorage.clear();
    return this.http.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDm11ltHEGq2trpZp0LsK1Pi5dKiq18d4I",
      {
        email: userCredentials.email,
        password:	userCredentials.password,
        returnSecureToken: "true"
      }
    ).subscribe(resopnse => this.getUserDetails(resopnse), this.showError);
  }

  getUserDetails(response){
    localStorage.setItem('localId',response.localId);
    this.router.navigate(['/user/'+response.localId+'/todo/private']);
    this.http.get("https://angular-todo-2f483.firebaseio.com/users/"+response.localId+".json")
    .subscribe(
      (result:any) => {
        console.log("Hello")
        this.messageService.successMessage("Welcome Back")
        localStorage.setItem("UserDetails", JSON.stringify(result));
      }, this.showError)
  }

  showError(error){
    console.log("Error Occurred")
    console.log(error);
    this.messageService.errorMessage(error.error.error.message);
    this.messageService.deactivateSpinner();
  }

}
