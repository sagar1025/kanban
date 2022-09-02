import { Component, Input, OnInit } from '@angular/core';
import IColumn from '../interface/IColumn';
import { StorageService } from '../services/storageService';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  @Input() column = {} as IColumn;
  constructor(private localstorage: StorageService) { }

  ngOnInit(): void {
  }
  
  onDisplayColumns(): void {
    //
  }
}
