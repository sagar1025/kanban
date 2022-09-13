import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IBoard } from '../interface/IBoard';
import IColumn from '../interface/IColumn';
import ITask from '../interface/ITask';
import { StorageService } from '../services/storageService';
import { activeBoardKey, boardKey } from '../constants';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  private eventsSubscription: Subscription = new Subscription;
  backDrop: HTMLElement = document.createElement('div');

  @Input() taskToEdit!: Observable<ITask>;
  @Output() onUpdateTask = new EventEmitter<ITask>();

  taskToDisplay: ITask = { id: 0, title: '', description: '', columnId: -1 };
  statuses: IColumn[] = [];
  activeBoard: IBoard;

  @ViewChild('taskModal') modal: any;
  
  constructor(private localstorage: StorageService) {
    this.backDrop.className = 'modal-backdrop fade show';
    this.backDrop.id = 'backdrop';
    this.activeBoard = <IBoard>this.localstorage.get(activeBoardKey);
    this.statuses = this.activeBoard.columns && this.activeBoard.columns.length > 0 ? this.activeBoard.columns : [];
  }

  ngOnInit(): void {
    this.eventsSubscription = this.taskToEdit.subscribe((task: ITask) => {
      this.taskToDisplay = task;
      document.body.append(this.backDrop);
      this.modal.nativeElement.style.display = 'block';
      this.modal.nativeElement.classList = 'modal fade show';
    });
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }

  closeModal() {
    this.backDrop.remove();
    this.modal.nativeElement.style.display = 'none';
    this.modal.nativeElement.classList = 'modal';
  }

  updateSubtask(event: Event, subtaskId: number): void {
    if (this.taskToDisplay.subTasks) {
      const allBoards = this.getAllBoards();
      const isChecked = (<HTMLInputElement>event.target).checked;

      this.taskToDisplay.subTasks[subtaskId].complete = isChecked;
      allBoards[this.activeBoard.id].columns[this.taskToDisplay.columnId].tasks[this.taskToDisplay.id].subTasks[subtaskId].complete = isChecked;
      this.updateLocalStorage(allBoards);
    }
  }

  updateStatus(event: Event) {
    const allBoards = this.getAllBoards();
    const colId = parseInt((<HTMLInputElement>event.target).value);

    this.taskToDisplay.columnId = colId;
    allBoards[this.activeBoard.id].columns[this.taskToDisplay.columnId].tasks[this.taskToDisplay.id] = this.taskToDisplay;
    this.updateLocalStorage(allBoards);
  }

  updateLocalStorage(updatedBoards: Array<IBoard>) {
    this.localstorage.set(boardKey, updatedBoards);
    //also set active board
    this.localstorage.set(activeBoardKey, this.activeBoard);

    this.onUpdateTask.emit(this.taskToDisplay);
  }

  getAllBoards() {
    return this.localstorage.get(boardKey);
  }

}
