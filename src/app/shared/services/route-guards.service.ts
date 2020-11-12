import { Injectable } from '@angular/core';
import { CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RouteGuardsService implements CanDeactivate<LoginComponent> {

  constructor() { }

  canDeactivate(component: LoginComponent): boolean {
    if (component.newUser.country !='' && component.newUser.country||
        component.newUser.city !='' && component.newUser.city||
        component.newUser.street !='' && component.newUser.street||
        component.newUser.house !='' && component.newUser.house||
        component.newUser.phone !='' && component.newUser.phone||
        component.newUser.card !='' && component.newUser.card
    ) {
      return confirm('There are some unsaved data.Do you really want to navigate?')
    }
    return true;
  }
}

