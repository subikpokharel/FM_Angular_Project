import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from 'src/app/shared/my-dialog/my-dialog.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {

    //const id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];

        this.recipe = this.recipeService.getRecipeById(this.id);
      }
    );

  }

  onAddToShopping(){
    this.recipeService.addIngredientToShopping(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo: this.route});
  }

  onDeleteRecipe(): void {

    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {
        myVar: "My VARIABLE"
      }
    });

    dialogRef.afterClosed().subscribe(
        data => {
          console.log('The Dialog was closed');
          console.log( data);
        });
    
  }

}
