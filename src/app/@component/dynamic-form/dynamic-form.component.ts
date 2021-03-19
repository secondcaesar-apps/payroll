import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from 'src/app/models/edit-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent  {
  @Input() question: QuestionBase<any>=new QuestionBase();
  @Input() form: FormGroup| any;
  @Input() status: boolean=false;
  get isValid() { return this.form.controls[this.question.key]; }
}

