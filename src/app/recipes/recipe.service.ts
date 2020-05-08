import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
//Injecting service inside a service
@Injectable()
export class RecipeService{

    public recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('Chicken Schnitzel', 'A super tasty schnitzel - just yummy!!',
        'https://img3.stockfresh.com/files/p/peteer/m/39/7817296_stock-photo-wiener-schnitzel-with-potatoes.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
        new Recipe('Big Fat Burger', 'No words really!!',
        'https://pbs.twimg.com/media/Dd0OaDXUwAAxKeY.jpg',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat patty', 1),
            new Ingredient('Salad', 1)
        ])
    ];

    constructor(private slService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

  addIngredientToShopping(ingredients: Ingredient[]){

    this.slService.addIngredients(ingredients);
  }

}