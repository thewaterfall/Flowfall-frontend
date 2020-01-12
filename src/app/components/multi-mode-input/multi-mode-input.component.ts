import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

enum InputMode {
  VIEW = 'view', EDIT = 'edit'
}

@Component({
  selector: 'multi-mode-input',
  templateUrl: './multi-mode-input.component.html',
  styleUrls: ['./multi-mode-input.component.scss']
})
export class MultiModeInputComponent implements OnInit {

  @Input() inputMode: string = InputMode.VIEW;
  @Input() textArea: boolean = false;
  @Input() minWidthStyle: string = '140px';
  @Input() value: string;

  @Output() valueChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeValue() {
    this.valueChanged.emit(this.value);
    this.switchInputMode();
  }

  switchInputMode() {
    if (this.inputMode === InputMode.VIEW) {
      this.inputMode = InputMode.EDIT;

      setTimeout(f => {
        let valueInput = document.getElementById('valueInput');
        valueInput.focus();
        // @ts-ignore
        valueInput.select();
      }, 100);
    } else {
      this.inputMode = InputMode.VIEW;
    }

  }
}
