import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storageService';
import { activeBoardKey, boardKey } from '../constants';
import { IBoard } from '../interface/IBoard';
import IColumn from '../interface/IColumn';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import ITask from '../interface/ITask';
import ISubtask from '../interface/ISubtask';
import { faX } from '@fortawesome/free-solid-svg-icons';

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
    //console.log(this.taskForm.value);
    // TO DO update board.

    const allBoards = this.localstorage.get(boardKey);
    let activeBoard = <IBoard>this.localstorage.get(activeBoardKey);
    const formData = this.taskForm.value;
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
  }


}
