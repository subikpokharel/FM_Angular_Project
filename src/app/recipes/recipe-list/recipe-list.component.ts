import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is simply a test',
    'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg'),
    new Recipe('A test Recipe', 'This is simply a test',
    'https://www.tasteofhome.com/wp-content/uploads/2018/01/Skillet-Chicken-Stew_EXPS_CIMZ17_2175_D07_20_6b-1-696x696.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
