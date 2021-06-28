import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
/* Our Components */
import { HomeComponent } from './pages/home-page/home/home.component';
import { NotFoundComponent } from './pages/not-found-page/not-found/not-found.component';
import { AccountInfoComponent } from './pages/account-page/account-info/account-info.component';
import { FormInputOutputComponent } from './pages/form-page/form-input-output/form-input-output.component';
import { TopBarComponent } from './top-display/top-bar/top-bar.component';
import { LayoutComponent } from './display/layout/layout.component';
import { NavigationComponent } from './top-display/navigation/navigation.component';
import { SidenavListComponent } from './top-display/sidenav-list/sidenav-list.component';
import { TextBoxComponent } from './pages/form-page/text-box/text-box.component';
import { TextOutputComponent } from './pages/form-page/text-output/text-output.component';
import { DataDisplayTestComponent } from './pages/flower-data-test-page/data-display-test/data-display-test.component';
/* Data Service */
import {DataService} from './data.service';
/* All material modules we are using */
import { MatModule } from './materials.module';

@NgModule({
  imports: [
    MatModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'account',
        component: AccountInfoComponent
      },
      {
        path: 'form-page',
        component: FormInputOutputComponent
      },
      {
        path: 'data-page',
        component: DataDisplayTestComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }]),
    BrowserModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    HomeComponent,
    AppComponent,
    TopBarComponent,
    LayoutComponent,
    NavigationComponent,
    SidenavListComponent,
    TextBoxComponent,
    TextOutputComponent,
    DataDisplayTestComponent,
    NotFoundComponent,
    FormInputOutputComponent
    ],
  // "providers" is used for services
  providers: [
    HomeComponent,
    DataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
