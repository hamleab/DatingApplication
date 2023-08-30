import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Emulated is the default value for CSS to apply in the component ony not globally. None is to apply globally
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined; // Input decorator allows us to pass data from parent component to child component

  constructor() { }

  ngOnInit(): void {
  }

}
