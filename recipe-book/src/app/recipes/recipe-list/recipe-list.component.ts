import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe';



@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];
  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipe = new Recipe('Dummy', 'Dummy', 'https://images-na.ssl-images-amazon.com/images/I/51E%2B7V-PDyL.jpg');

  constructor() { }

  ngOnInit() {
  }

  onSelected(recipe: Recipe){
    this.recipeSelected.emit(recipe);
  }
}
