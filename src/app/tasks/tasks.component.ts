import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IBoard } from '../interface/IBoard';
import ITask from '../interface/ITask';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Input() columnTasks: ITask[] | undefined = [];
  onOpenModal: Subject<ITask> = new Subject<ITask>();

  constructor() { }

  ngOnInit(): void {
  }

  openModal(task: ITask): void {
    this.onOpenModal.next(task);
  }
  onUpdatetask(updatedTask: ITask): void {
    if(this.columnTasks !== undefined && this.columnTasks[updatedTask.id]) {
      this.columnTasks[updatedTask.id] = updatedTask;
    }
    window.location.reload();

  }
}