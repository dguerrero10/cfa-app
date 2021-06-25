import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserRegisteredListener()
      .subscribe(data => {
        if (data.success) {
          this.login = true;
        }
      })
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
