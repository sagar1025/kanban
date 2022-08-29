import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StorageService } from '../services/storageService';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { boardKey, activeBoardKey } from '../constants';
import { IBoard } from '../interface/IBoard';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

@Injectable({
  providedIn: 'root'
})
export class SidebarComponent implements OnInit {
  boardKey = boardKey;
  activeBoardKey = activeBoardKey;
  boards: IBoard[] = [];
  boardsCount: number = 0;
  faTrello = faTrello;
  activeBoardId: number = 0;

  constructor(private localstorage: StorageService) { }

  ngOnInit(): void {
    this.boards = this.getBoards();
    this.boardsCount = this.boards ? this.boards.length : 0;
    if(this.boardsCount === 0) {
      this.activeBoardId = 0;
    }
    const activeBoard = <IBoard>this.localstorage.get(activeBoardKey);
    this.activeBoardId = activeBoard ? activeBoard.id : 0;
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

  setActiveBoard(id: number) {
    this.activeBoardId = id;
    this.localstorage.set(this.activeBoardKey, this.getActiveBoard()[0]);
    window.location.reload();
  }

  getActiveBoard() {
    return this.boards.filter(board => board.id === this.activeBoardId);
  }

};