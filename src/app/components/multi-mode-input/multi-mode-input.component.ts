import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

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
  @Input() emptyMessage: string = 'Click to enter text';
  @Input() canActivate: boolean = true;

  @Output() valueChanged = new EventEmitter();

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.handleKeyPress(event);
  }

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

  /**
   * Pressing Enter will submit input value
   * Pressing Shift + Enter will move caret to the next line
   */
  handleKeyPress(event) {
    if (this.inputMode === InputMode.EDIT) {
      if (event.shiftKey && event.key === 'Enter') {
        this.value += '\n';
      } else if (!event.shiftKey && event.key === 'Enter') {
        this.changeValue();
      }
    }
  }

}
