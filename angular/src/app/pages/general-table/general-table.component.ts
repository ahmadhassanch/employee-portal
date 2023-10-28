import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss'],
})
export class TableComponent {

  @Input() config: any
  @Output() tableActionSignal = new EventEmitter<any>();



ngOnInit() {
}

onSearchClick() {
  
  let search = document.getElementById('search')

  if ( search.style.width == '200px') {
    search.style.width = '0px'
    search.style.border = 'none'
  }
  else {
    search.style.width = '200px';
    search.style.borderBottom  = '1px solid rgb(206, 212, 218)'
    console.log(search.style.border)
  }

}

onAction(action, item = null) {

  let dataToEmit = {action}
  if (item) {
    dataToEmit['data'] = item
  }
  this.tableActionSignal.emit(dataToEmit)
}

}
