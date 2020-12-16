import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input
} from "@angular/core";
import { TodoListData } from "../dataTypes/TodoListData";
import { TodoItemData } from "../dataTypes/TodoItemData";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  @Input()
  data: TodoItemData;
  editing: boolean;
  private touchTime = 0;

  constructor(private todoService: TodoService) {
    this.editing = false;
  }

  ngOnInit() {}

  get label(): string {
    return this.data.label;
  }

  //Definit si l'item est en mode edition ou non
  editData(item: TodoItemData, editing: boolean) {
    
    if (this.touchTime == 0) {
      this.touchTime = new Date().getTime();
    } else {
      if (new Date().getTime() - this.touchTime < 800) {
        this.todoService.setItemEditing(editing, item);
        this.touchTime = 0;
      } else {
        this.touchTime = new Date().getTime();
      }
    }
  }

  //Modifie le label d'un item
  setLabel(item: TodoItemData, newLabel: string) {
    this.todoService.setItemsLabel(newLabel, item);
  }

  //Retire un item de la liste
  removeItem(item: TodoItemData) {
    this.todoService.removeItems(item);
  }

  //Valide ou invalide un item
  itemDone(item: TodoItemData, done: boolean) {
    this.todoService.setItemsDone(done, item);
  }
}



























// import {Component, OnInit} from '@angular/core';

// @Component({
//   selector: 'app-todo-item',
//   templateUrl: './todo-item.component.html',
//   styleUrls: ['./todo-item.component.css']
// })
// export class TodoItemComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
