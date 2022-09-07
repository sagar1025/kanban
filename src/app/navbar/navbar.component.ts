import { Component, OnInit, Output } from '@angular/core';
import { StorageService } from '../services/storageService';
import { activeBoardKey, boardKey } from '../constants';
import { IBoard } from '../interface/IBoard';
import IColumn from '../interface/IColumn';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import ITask from '../interface/ITask';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  activeBoard: any;
  columns: IColumn[] = [];
  taskForm: FormGroup;
  faX = faX;
  @Output() onAddTask = new EventEmitter<ITask>();


  constructor(private localstorage: StorageService, private fb: FormBuilder) { 
    this.taskForm = this.fb.group({
      title: ['', {
        validators: [Validators.required],
        updateOn: 'blur',
      }],
      description: ['', Validators.required],
      status: 0,
      subtasks: this.fb.array([])
    });

  }
  ngOnInit(): void {
    this.activeBoard = <IBoard>this.localstorage.get(activeBoardKey);
    this.columns = this.activeBoard.columns && this.activeBoard.columns.length > 0 ? this.activeBoard.columns : [];
  }

  get subtasks(): FormArray {
    return this.taskForm.controls["subtasks"] as FormArray;
  }

  newSubTask(): FormGroup {
    return this.fb.group({
      id: this.subtasks.length,
      description: '',
      complete: false,
    })
  };

  removeSubTask(id: number): void {
    return this.subtasks.removeAt(id);
  };

  addSubtasks(event: Event) {
    this.subtasks.push(this.newSubTask());
  }

  addTask():void {
    const allBoards = this.localstorage.get(boardKey);
    let activeBoard = <IBoard>this.localstorage.get(activeBoardKey);
    const formData = this.taskForm.value;
    if(formData.title && formData.description && formData.status > -1) {
      const task = {
        id: allBoards[activeBoard.id].columns[formData.status].tasks && allBoards[activeBoard.id].columns[formData.status].tasks.length > 0 ?
        allBoards[activeBoard.id].columns[formData.status].tasks.length : 0,
        title: formData.title,
        description: formData.description,
        columnId: formData.status,
        subTasks: formData.subtasks
      } as ITask;
  
      if (task.id === 0) {
        allBoards[activeBoard.id].columns[formData.status].tasks = [task] as [ITask];
      }
      else {
        allBoards[activeBoard.id].columns[formData.status].tasks.push(task as ITask);
      }
  
      this.localstorage.set(boardKey, allBoards);
      //update activeBoard
      activeBoard = allBoards[activeBoard.id];
      this.localstorage.set(activeBoardKey, activeBoard);
      //send event to parent so the UI is updated.
      this.onAddTask.emit(task);
      //close the modal
      const closeBtn = <HTMLButtonElement>document.querySelector("#addTask .btn-close");
      if (closeBtn !== null) {
        closeBtn.click();
      }
    }
  }
}
