import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-come-back-button',
  templateUrl: './come-back-button.component.html',
  styleUrls: ['./come-back-button.component.css']
})
export class ComeBackButtonComponent implements OnInit {

  constructor(private _location:Location) { }

  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();
  }
}
