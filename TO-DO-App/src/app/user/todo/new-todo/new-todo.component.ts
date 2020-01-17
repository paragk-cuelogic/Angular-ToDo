import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  todoForm:FormGroup;

  test:boolean;

  constructor(
              private todoService:TodoDataService,
              private router:Router) {
      console.log("New TODO Component Constructor Called");
      console.log("Set isTodo To False");
      this.todoService.setIsToDo(false);
   }

  ngOnInit() {
    console.log("ngOnInit of New TODO Component Called");
    console.log("Setting Form Controls for the Field");
    this.todoForm = new FormGroup(
      {
        "title": new FormControl(null,Validators.required),
        "desc": new FormControl(null,Validators.required),
        "dueDate": new FormControl(null,Validators.required),
        "reminderDate": new FormControl(null,Validators.required),
        "category": new FormControl(null,Validators.required),
        "isPublic": new FormControl(null,Validators.required)
      }
    )
    console.log("Controls Set");
  }

  submit(){
    console.log("Submit New ToDo Form");
    const testA = {
      owner: localStorage.getItem("UserEmail"),
      title: this.todoForm.value.title,
      desc: this.todoForm.value.desc,
      dueDate: this.todoForm.value.dueDate,
      reminderDate: this.todoForm.value.reminderDate,
      category: this.todoForm.value.category,
      isPublic: false,
      // isPublic: Boolean(this.todoForm.value.isPublic),
      status: "pending",
      todoID: Math.random().toString(36).substr(2, 10)
    };
    console.log("Converted Form Data into OBJECT");
    console.log(testA);
    console.log("Add New ToDo Service Called");
    this.todoService.addTodo(testA);
    // this.todoService.addTodo(testA);
  }

}
