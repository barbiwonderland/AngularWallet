import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  increment,
  decrement,
  reset,
  add,
  substract,
} from './redux/actions/counter.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentItem = 'Television';
  user: any;
  user$?: Observable<any>;
  constructor(private store: Store<{ user: any }>) {}
  title = 'AngularWallet';

  ngOnInit(): void {
    this.user$ = this.store.select('user');
    console.log(this.store.select('user'));
    this.user$.subscribe((data: any) => {
      let [{ id: id }] = data;
      // console.log(nameValue, id); //your data shows here
      this.user = id;
      // console.log(this.user);
      localStorage.setItem("id",this.user)
    });
  }
}
