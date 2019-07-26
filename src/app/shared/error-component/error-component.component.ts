import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-component',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.scss']
})
export class ErrorComponentComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('toCheck')
  fieldName: FormControl;

  @Input()
  label: string;

  constructor() { }

  ngOnInit() {
  }

}
