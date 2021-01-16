import { Component, OnInit } from '@angular/core';
import { pi } from 'pure-ts';

@Component({
  selector: 'lib-lib',
  template: `
    <p>
      lib works {{pi}}!
    </p>
  `,
  styles: [
  ]
})
export class LibComponent implements OnInit {

  public pi = pi();

  constructor() { }

  ngOnInit(): void {
  }

}
