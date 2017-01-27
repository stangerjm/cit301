  import { Component } from '@angular/core';

	@Component({
		selector: 'app-root',
		template: `
			<h1>Root Component</h1>
			<fa-lifecycle *ngIf="!delete" [bindable]="boundValue">
			    <p #boundContent>{{test}}</p>
      </fa-lifecycle>
			<button (click)="delete = true">Click to Delete</button>
			<button (click)="test = 'changed value'">Click to Change</button>
			<button (click)="boundValue = 2000">Click for Binding</button>
			
	`
	})
	export class AppComponent {
      delete=false;
      test = 'Starting Value';
      boundValue = 1000;
	}
