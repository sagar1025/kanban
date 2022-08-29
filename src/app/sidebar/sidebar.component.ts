import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StorageService } from '../services/storageService';
import { faTrello } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

@Injectable({
  providedIn: 'root'
})
export class SidebarComponent implements OnInit {
  boardKey = 'BOARDS';
  boards: IBoard[] = [];
  boardsCount: number = 0;
  faTrello = faTrello;

  constructor(private localstorage: StorageService) { }

  ngOnInit(): void {
    this.boards = this.getBoards();
    this.boardsCount = this.boards ? this.boards.length : 0;
  }

  getBoards() {
    const boards = this.localstorage.get(this.boardKey);
    return boards;
  }

  addBoard(form: NgForm): void {
    const formData = form.value;
    if(formData && formData.boardName)  {
      const boardName = formData.boardName;
      let boards = <[IBoard]>this.getBoards() || [];
      console.log(boards);
      if(boards && boards !== null && boards.length > 0) {
        const data: IBoard = {
          name: boardName,
          id: this.boardsCount
        };
        boards.push(data);
      }
      else {
        const board: IBoard = {
          name: boardName,
          id: this.boardsCount
        }
        boards.push(board);
      }
      this.localstorage.set(this.boardKey, boards);
      window.location.reload();
    }
  }
};

interface IBoard {
  id: number;
  name: string;
}