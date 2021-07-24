import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewImageService {
  private viewImgVisible = new BehaviorSubject<boolean>(false);
  public viewImgVisibleListener = this.viewImgVisible.asObservable();

  private _viewImg = new BehaviorSubject<boolean>(false);
  public viewImgListener = this._viewImg.asObservable();

  constructor() { }

  changeViewImgState(value: boolean) {
    this.viewImgVisible.next(value);
  }

  viewImg(value: boolean) {
    this._viewImg.next(value);
  }

}
