import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'general-table-new',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss'],
})
export class GeneralTableComponent implements AfterViewInit, OnInit {
  @Input() data!: any[];
  @Input() actions!: {
    refresh: () => void;
    add: () => void;
  };
  searchValue: string = '';
  @Output() searchQuery = new EventEmitter<string>();
  dataSource: any;
  constructor() {}
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  columns!: string[];
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data);
    console.log(this.dataSource);
    if (this.data.length > 0) {
      this.columns = Object.keys(this.data[0]);
    } else {
      console.log('Data is not find');
    }
    console.log('Search feild Value', this.searchValue);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onSearch() {
    this.searchQuery.emit(this.searchValue);
  }
  openFilter(column: string) {
    console.log('Filter clicked for column', column);
    // Implement your filter logic here
    // You can use a dialog or menu to set filter criteria for the specified column
  }
}
