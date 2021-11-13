import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/* Our Components */
import { HomeComponent } from './pages/home-page/home/home.component';
import { NotFoundComponent } from './pages/not-found-page/not-found/not-found.component';
import { LayoutComponent } from './display/layout/layout.component';
import { NavigationComponent } from './top-display/navigation/navigation.component';
import { SidenavListComponent } from './top-display/sidenav-list/sidenav-list.component';
import { AboutTextComponent } from './pages/about-page/about-text/about-text.component';
import { WildlifeMultiplechoiceComponent } from './pages/wildlife-advice-page/wildlife-multiplechoice/wildlife-multiplechoice.component';
import { WildlifeLayoutComponent } from './pages/wildlife-advice-page/wildlife-layout/wildlife-layout.component';
import { ExampleGardensBodyComponent } from './pages/example-gardens-page/example-gardens-body/example-gardens-body.component';
/* Data Service */
import {DataService} from './data.service';
/* All material modules we are using */
import { MatModule } from './materials.module';
import { WildlifeAnswers } from './pages/wildlife-advice-page/wildlife-answers.service';
import { WildlifeResponse } from './pages/wildlife-advice-page/wildlife-response.service';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { WildlifeInfoGenericComponent } from './pages/wildlife-advice-page/wildlife-info-generic/wildlife-info-generic.component';
import { PollinatorSuggestionsComponent } from './pages/wildlife-advice-page/pollinator-suggestions/pollinator-suggestions.component';
import { PollinatorDialogComponent } from './pages/wildlife-advice-page/pollinator-dialog/pollinator-dialog.component';

@NgModule({
  imports: [
    MatModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    NgbModule
  ],
  declarations: [
    HomeComponent,
    AppComponent,
    LayoutComponent,
    NavigationComponent,
    SidenavListComponent,
    AboutTextComponent,
    NotFoundComponent,
    WildlifeMultiplechoiceComponent,
    WildlifeLayoutComponent,
    ExampleGardensBodyComponent,
    WildlifeInfoGenericComponent,
    PollinatorDialogComponent,
    PollinatorSuggestionsComponent,
    ],
  entryComponents: [
      PollinatorDialogComponent,
    ],
  // "providers" is used for services
  providers: [
    DataService,
    WildlifeAnswers,
    WildlifeResponse,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
