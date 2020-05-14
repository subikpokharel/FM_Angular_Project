import { Directive, HostListener, HostBinding, ElementRef } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective{

    constructor(private elRef: ElementRef) { }

    @HostBinding('class.open') isOpen = false;
    
    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
        this.elRef.nativeElement.querySelector('.dropdown-menu').classList.toggle('show')

    }
}