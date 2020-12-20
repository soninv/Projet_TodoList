import { Injectable } from '@angular/core';
import {TodoListData} from './dataTypes/TodoListData';
import {Observable, BehaviorSubject} from 'rxjs';
import {TodoItemData} from './dataTypes/TodoItemData';

var stock;
@Injectable()
export class TodoService {

  private todoListSubject = new BehaviorSubject<TodoListData>( {label: 'TodoList', items: []} );
  constructor() { }

  getTodoListDataObserver(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  //Modifie de label des items passes en argument
  setItemsLabel(label: string, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label, isDone: I.isDone, editing: false}) )
    });
  }
  // on enregistre le tableau d'item dans le local storage
  getLocalStorageItemsTodolist(): TodoItemData[] {
    const localStorageItem = JSON.parse(localStorage.getItem('items'));
    return localStorageItem == null ? [] : localStorageItem.items;
  }

  // on recupere le tableau d'item dans le local storage
  setLocalStorageItemsTodolist(items: TodoItemData[] ): void {
    localStorage.setItem('items', JSON.stringify({ items: items }));
  }

  //Valide ou invalide les items passes en argument
  setItemsDone(isDone: boolean, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label: I.label, isDone, editing: false}) )
    });
    this.setLocalStorageItemsTodolist(this.todoListSubject.value.items);
    //stock = localStorage.setItem("items", JSON.stringify({ items: items } ));
  }

  //Passe en mode editing ou non editing les items passes en argument
  setItemEditing(isEditing: boolean, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label: I.label, isDone: I.isDone, editing: isEditing}) )
    });
    this.setLocalStorageItemsTodolist(this.todoListSubject.value.items);
   // stock = localStorage.setItem("items", JSON.stringify({ items: items } ));
  }

  


  //Ajoute les items passes en argument a la liste des items
  appendItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: [...tdl.items, ...items]
    });
    this.setLocalStorageItemsTodolist(this.todoListSubject.value.items);
   // stock = localStorage.setItem("items", JSON.stringify({ items: items } ));
  }

    //Retire les items passes en argument de la liste
  removeItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, 
      items: tdl.items.filter( I => items.indexOf(I) === -1 )
    });
  }



}
