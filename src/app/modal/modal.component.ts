import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { activeBoardKey } from '../constants';
import { IBoard } from '../interface/IBoard';
import IColumn from '../interface/IColumn';
import ITask from '../interface/ITask';
import { StorageService } from '../services/storageService';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  private eventsSubscription: Subscription = new Subscription;
  backDrop: HTMLElement = document.createElement('div');

  @Input() taskToEdit!: Observable<ITask>;
  taskToDisplay: ITask = {id: 0, title: '', description: '', columnId: -1};
  statuses: IColumn[] = [];
  activeBoard: any;

  @ViewChild('taskModal') modal: any;
  
  constructor(private localstorage: StorageService) {
    this.backDrop.className = 'modal-backdrop fade show';
    this.backDrop.id = 'backdrop';
    this.activeBoard = <IBoard>this.localstorage.get(activeBoardKey);
    this.statuses = this.activeBoard.columns && this.activeBoard.columns.length > 0 ? this.activeBoard.columns : [];
  }

  closeModal() {
    this.backDrop.remove();
    this.modal.nativeElement.style.display = 'none';
    this.modal.nativeElement.classList = 'modal';
  }

  ngOnInit(): void {
    //console.log(this.taskToEdit);
    console.log(this.statuses);
    this.eventsSubscription = this.taskToEdit.subscribe((task: ITask) => {
      this.taskToDisplay = task;
      document.body.append(this.backDrop);
      this.modal.nativeElement.style.display = 'block';
      this.modal.nativeElement.classList = 'modal fade show';
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

}
