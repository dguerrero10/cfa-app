import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormListenerService {
  private _onResetPasswordForm = new BehaviorSubject<boolean>(false);
  public onResetPasswordFormListener = this._onResetPasswordForm.asObservable();

  constructor() { }

  onResetPasswordForm(value: boolean) {
    this._onResetPasswordForm.next(value);
  }
}
