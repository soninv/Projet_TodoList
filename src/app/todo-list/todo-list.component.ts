import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TodoListData } from '../dataTypes/TodoListData';
import { TodoItemData } from '../dataTypes/TodoItemData';
import { TodoService } from '../todo.service';
import { TouchSequence } from 'selenium-webdriver';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  @Input()

  data: TodoListData;
  titre: string;
  mode: string; 



  constructor(private todoService: TodoService) {
    
    todoService.getTodoListDataObserver().subscribe(tdl => this.data = tdl);
    this.titre = this.data.label;
    this.mode = 'All';
  }

  ngOnInit() {
  }

  get label(): string {
    return this.data ? this.data.label : '';
  }

  get items(): TodoItemData[] {
    return this.data ? this.data.items : [];
  }

  //Ajoute un item a la liste
  appendItem(label: string) {
    this.todoService.appendItems(
      {
        label,
        isDone: false,
      });
  }

  //Valide ou invalide un item
  itemDone(item: TodoItemData, done: boolean) {
    this.todoService.setItemsDone(done, item);
  }

  //Modifie le label d'un item
  itemLabel(item: TodoItemData, label: string) {
    this.todoService.setItemsLabel(label, item);
  }

  //Retire un item de la liste
  removeItem(item: TodoItemData) {
    this.todoService.removeItems(item);
  }

  //Retire de la ToDo liste les items valides
  removeDoneItems() {
    this.data.items.forEach(item => {
      if (item.isDone)
        this.todoService.removeItems(item);
    });
  }

  //Retire tous les items
  clearAll() {
    this.data.items.forEach(item => {
      this.todoService.removeItems(item);
    })
  }

  //Renvoie le nombre d'items non valides
  getCountLeft(): number {
    var CountLeft: number = 0;
    this.data.items.forEach(item => {
      if (!item.isDone)
        CountLeft++;
    });
    return CountLeft;
  }

  setMode(mode: string) {
    this.mode = mode;
  }

  //Valide tous les items ou les invalides tous s'ils sont deja tous valides
  toggleUntoggleAll() {
    if (this.getCountLeft() == 0) {
      this.data.items.forEach(item => {
        this.todoService.setItemsDone(false, item);
      });
    }
    else {
      this.data.items.forEach(item => {
        this.todoService.setItemsDone(true, item);
      });
    }
  }
}
