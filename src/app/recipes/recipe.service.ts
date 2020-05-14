import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
//Injecting service inside a service
@Injectable()
export class RecipeService{

    recipeChanged = new Subject<Recipe[]>();
    //public recipeSelected = new Subject<Recipe>();
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
        ]),
        new Recipe('Chowmein', 'Nepali noodle dish.',
        'https://www.alicaspepperpot.com/wp-content/uploads/2018/03/DSC_0039-2-1024x709.jpg',
        [
            new Ingredient('Spaghetti', 2),
            new Ingredient('Meat', 1),
            new Ingredient('Bell Pepper', 1),
            new Ingredient('Cabbage', 1)
        ]),
        new Recipe('Momos', 'An authentic nepalese street food!!',
        'https://i.ytimg.com/vi/7tdUCk9pLPw/maxresdefault.jpg',
        [
            new Ingredient('Flour', 2),
            new Ingredient('Meat minced', 1),
            new Ingredient('Tomatoes', 5),
            new Ingredient('Veggies', 3)
        ])
    ];

    constructor(private slService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientToShopping(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    getRecipeById(index: number){
        return this.recipes.slice()[index];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }

}