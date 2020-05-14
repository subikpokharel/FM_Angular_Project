import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
//Injecting service inside a service
@Injectable()
export class RecipeService{

    recipeChanged = new Subject<Recipe[]>();
    //public recipeSelected = new Subject<Recipe>();
    private recipes: Recipe[];

    constructor(private slService: ShoppingListService, private httpClient:HttpClient){
        this.loadRecipies().subscribe({
            next: data => {
                console.log("data",data);
                this.recipes = data;
                this.recipeChanged.next(this.recipes.slice());
            },
            error: error => {
                console.log(error)
            }
        });

        console.log(this.recipes);
    }

    loadRecipies(): Observable<Recipe[]>{
        let url="/assets/recipes.json"
        return this.httpClient.get<Recipe[]>(url);
    }
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