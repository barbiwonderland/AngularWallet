import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Input } from '@angular/core'; // First, import Input

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
@Input() item = ''; // decorate the property with @Input()

  // user: any;
  // user$?: Observable<any>;
  constructor(private store: Store<{ user: any }>) {}

  ngOnInit(): void {
    // this.user$ = this.store.select('user');
    // console.log(this.store.select('user'));
    // this.user$.subscribe((data: any) => {
    //   let [{ name: nameValue }] = data;
    //   console.log(nameValue); //your data shows here
    //   this.user = nameValue;
    // });
  }
}
