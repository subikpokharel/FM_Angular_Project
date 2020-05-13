import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  

  // @ViewChild('nameInput') nameInputReference: ElementRef;
  // @ViewChild('amountInput') amountInputReference: ElementRef;

  shoppingForm: FormGroup;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private slistService: ShoppingListService) { }

  ngOnInit(): void {

    this.shoppingForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null,[Validators.required, Validators.pattern("^[1-9]+[0-9]*$")])
    });

    this.subscription = this.slistService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.editedItem = this.slistService.getIngredientsById(index);

        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const value = this.shoppingForm.value;
    // const ingName = this.nameInputReference.nativeElement.value;
    // const ingAmount = this.amountInputReference.nativeElement.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slistService.updateIngredient(this.editItemIndex, newIngredient)
    }else{
      this.slistService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.shoppingForm.reset();
  }

  onDelete(){
    this.slistService.deleteIngredient(this.editItemIndex);
    this.editMode = false;
    this.shoppingForm.reset();
  }

  onClear(){
    this.shoppingForm.reset();
    this.editMode = false;
  }
}
