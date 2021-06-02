import { Component, OnInit } from '@angular/core';

export interface FormDialogue {
  dialogue: string;
  action: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  cfaLogo = '../../../../../assets/images/cfa-logo.svg';
  login: boolean = true;

  formDialogueRef: FormDialogue = {
    dialogue: 'Need an account? ',
    action: ' Register'
  }

  constructor() { }

  ngOnInit(): void {
  }

  switchForms() {
    this.login = !this.login;
    if (this.login === true) {
      this.formDialogueRef = {
        dialogue: 'Need an account? ',
        action: ' Register'
      }
    }
    else { 
      this.formDialogueRef = {
        dialogue: 'Already have an account? ',
        action: ' Login'
      }
    }
  }

}
