import { dataUser } from './../redux/actions/user.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { add, substract } from '../redux/actions/counter.action';

@Injectable({
  providedIn: 'root',
})
export class ReduxService {
  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }

  add(n: number) {
    this.store.dispatch(add({ num: n }));
  }
  substract(n: number) {
    this.store.dispatch(substract({ num: n }));
  }
  update(user: any) {
    this.store.dispatch(dataUser({ user}));
  }


}
