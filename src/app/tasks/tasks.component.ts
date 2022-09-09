import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
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
}