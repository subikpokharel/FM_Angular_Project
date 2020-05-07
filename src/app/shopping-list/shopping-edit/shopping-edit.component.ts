import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputReference: ElementRef;
  @ViewChild('amountInput') amountInputReference: ElementRef;

  @Output() ingridentAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(){
    const ingName = this.nameInputReference.nativeElement.value;
    const ingAmount = this.amountInputReference.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.ingridentAdded.emit(newIngredient);
  }
}
