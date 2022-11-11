import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent, newform, popupbox, deletemethod, deletepopup } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';
import { MatPaginatorModule }   from '@angular/material/paginator';
import { MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { CustomizePipeComponent } from './customize-pipe/customize-pipe.component';
import { UpperCasePipe } from './upper-case.pipe';
import { UserDetailsComponent } from './user-details/user-details.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  declarations: [
    AppComponent,
    ListComponent,newform,popupbox,deletemethod,deletepopup,
    DetailsComponent,
    CustomizePipeComponent,
    UpperCasePipe,
    UserDetailsComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule
  ],
   providers :[ ],
  bootstrap: [AppComponent],
  entryComponents:[newform, popupbox,deletemethod,deletepopup]
})
export class AppModule { }
