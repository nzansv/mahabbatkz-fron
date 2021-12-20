import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing/landing.component';
import {SignupComponent} from './signup/signup.component';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import {MyProfileComponent} from './myprofile/myprofile.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        RouterModule,
        ReactiveFormsModule
    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        MyProfileComponent,
        HomeComponent,
        ProfileComponent,
        SearchComponent
    ]
})
export class PortalModule { }
