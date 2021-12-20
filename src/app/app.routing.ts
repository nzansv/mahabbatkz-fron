import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './modules/portal/profile/profile.component';
import { SignupComponent } from './modules/portal/signup/signup.component';
import { LandingComponent } from './modules/portal/landing/landing.component';
import { HomeComponent } from './modules/portal/home/home.component';
import { SearchComponent } from './modules/portal/search/search.component';

import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile/:id',     component: ProfileComponent },
    { path: 'search',     component: SearchComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
      HttpClientModule,
      RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
