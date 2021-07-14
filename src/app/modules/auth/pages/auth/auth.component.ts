import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormListenerService } from 'src/app/core/services/auth/form-listener.service';

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
  public login: boolean = true;
  public onPasswordResetForm: boolean = false;

  public formDialogueRef: FormDialogue = {
    dialogue: 'Need an account? ',
    action: ' Register'
  }

  constructor(private formListenerService: FormListenerService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.formListenerService.onResetPasswordFormListener
      .subscribe(value => this.onPasswordResetForm = value);
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
        action: 'Login'
      }
    }
  }

}
