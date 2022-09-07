import { Component, Input, OnInit } from '@angular/core';
import ITask from '../interface/ITask';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Input() columnTasks: ITask[] | undefined = [];

  constructor() { }

  ngOnInit(): void {
  }

  editTask(task: ITask): void {
    console.log(task);
  }

}
