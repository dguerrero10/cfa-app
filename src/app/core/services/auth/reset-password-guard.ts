import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ResetPasswordService } from "./reset-password.service";

@Injectable()
export class ResetPasswordGuard implements CanActivate {
    constructor(private resetPasswordService: ResetPasswordService, 
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isReset = this.resetPasswordService.getIsPasswordReset();
        if (!isReset) {
            this.router.navigate(['/login']);
        }
        return isReset;
    }
}