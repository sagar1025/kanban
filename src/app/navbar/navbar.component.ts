import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storageService';
import { activeBoardKey, boardKey } from '../constants';
import { IBoard } from '../interface/IBoard';
import IColumn from '../interface/IColumn';
import { NgForm } from '@angular/forms';
import ITask from '../interface/ITask';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  activeBoard: any;
  columns: IColumn[] = [];
  constructor(private localstorage: StorageService) { }

  ngOnInit(): void {
    this.activeBoard = <IBoard>this.localstorage.get(activeBoardKey);
    this.columns = this.activeBoard.columns && this.activeBoard.columns.length > 0 ? this.activeBoard.columns : [];
  }

  addTask(form: NgForm):void {
    const allBoards = this.localstorage.get(boardKey);
    let activeBoard = <IBoard>this.localstorage.get(activeBoardKey);
    const formData = form.value;
    const task = {
      id: allBoards[activeBoard.id].columns[formData.status].tasks && allBoards[activeBoard.id].columns[formData.status].tasks.length > 0 ?
      allBoards[activeBoard.id].columns[formData.status].tasks.length : 0,
      title: formData.title,
      description: formData.description,
      columnId: formData.status
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
