import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from './state/state.interface';
import { completeToDos, incompleteToDos } from './state/todo';
import { AddToDo, CompleteToDo, IncompleteToDo } from './state/todo/todo.actions';
import { generateToDos, ToDo } from './state/todo/todo.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'todo-app';
  completeToDos: Observable<Array<ToDo>>;

  incompleteToDos: Observable<Array<ToDo>>;

  private _toDo: Partial<ToDo>;

  constructor(private store: Store<State>) { }
  ngOnInit() {
    this.initialize()
  }
  initialize() {
    generateToDos().forEach(todo => this.store.dispatch(new AddToDo(todo)));
    this.completeToDos = this.store.select(completeToDos)
    this.incompleteToDos = this.store.select(incompleteToDos)
    // .subscribe(
    //   (value)=> this.incompleteToDos.pipe(value)
    // );
  }

  addToDo() {
    // console.log(this._toDo)
    this.store.dispatch(new AddToDo({
      id: Math.random(),
      complete: false,
      task: this._toDo.task
    }));
    this.initialize()
  }

  onAddToDoChange(event: object) {
    // console.log(event)
    this._toDo = event 
    // document.getElementById('inputToDo').val('')
  }

  onCompleteToDo(toDo: ToDo) {
    this.store.dispatch(new CompleteToDo(toDo));
  }

  onIncompleteToDo(toDo: ToDo) {
    this.store.dispatch(new IncompleteToDo(toDo));
  }
}
