import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '../../../core/model/User.model';
import {UserService} from '../../../core/service/user.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    id: number;
    user: UserModel;

    constructor(
        private activateRoute: ActivatedRoute,
        private userService: UserService
    ) {
        this.id = this.activateRoute.snapshot.params.id;
        this.userService.getUserDetailsById(this.id).subscribe(res => {
            this.user = res;
        })
    }

    ngOnInit() {}

}
