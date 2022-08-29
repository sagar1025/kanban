import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storageService';
import { activeBoardKey } from '../constants';
import { IBoard } from '../interface/IBoard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  activeBoard: any;
  constructor(private localstorage: StorageService) { }

  ngOnInit(): void {
    this.activeBoard = <IBoard>this.localstorage.get(activeBoardKey);
    console.log(this.activeBoard)
  }

}
