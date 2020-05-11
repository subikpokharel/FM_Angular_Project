import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from 'src/app/shared/my-dialog/my-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class RecipeEditRouterGuard implements CanActivate {

  constructor(private router: Router, public dialog: MatDialog){}
  canActivate(
    //to provide current route information
    next: ActivatedRouteSnapshot,
    //to provide router state information with its return type
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let id = +next.url[0].path; //retrieve the first parameter from the url. + at the begenning converts the URL path string to a number
      if(isNaN(id) || id<0){ //If the resulting value is not a number or less than zero
        //alert("Invalid Recipe ID "); //in real world we navigate/reroute to an error page and notify the user about the error
        const dialogRef = this.dialog.open(MyDialogComponent, {
          data: {
            dialogTitle: "Invalid Recipe ID",
            dialogMessage: "Please select where you want to be redirected!!",
            buttonSave: "Go Home",
            buttonCancel: "Shopping"
          }
        });
    
        dialogRef.afterClosed().subscribe(
          data => {
            if(data === "Save clicked"){
              this.router.navigate(['']);
              return false;
            }else{
              this.router.navigate(['/shopping-list']);
              return false;
            }
            
        });
        
        
      };
      return true;
  }
  
}