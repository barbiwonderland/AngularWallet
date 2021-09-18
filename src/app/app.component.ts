import { ReduxService } from './services/redux.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AngularWallet';
  constructor(private ReduxService: ReduxService) {}
  ngOnInit(): void {
    this.ReduxService.current();
  }
}
