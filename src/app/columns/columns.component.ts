import { Component, OnInit } from '@angular/core';
import { IBoard } from '../interface/IBoard';
import { StorageService } from '../services/storageService';
import { activeBoardKey, boardKey } from '../constants';
import IColumn  from '../interface/IColumn';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent implements OnInit {

  columns: IColumn[] = [];
  constructor(private localstorage: StorageService) { }

  ngOnInit(): void { }

  addColumn() {
    const newColumn: IColumn = {
      id: 0,
      name: 'asda'
    }
  }
}
