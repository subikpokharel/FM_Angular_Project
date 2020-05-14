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
        dialogTitle: "Delete Recipe",
        dialogMessage: "Would you like to delete this recipe?",
        buttonCancel: "NO",
        buttonSave: "Yes"
      }
    });

    dialogRef.afterClosed().subscribe(
        data => {
          if(data === "Save clicked"){
            this.recipeService.deleteRecipe(this.id);
            this.router.navigate(['../'], {relativeTo: this.route});
          }else{
            console.log("Dont");
          }
        });
    
  }

}
