import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from '../../../core/model/User.model';
import {UserService} from '../../../core/service/user.service';
import {Observable} from 'rxjs';
import {PersistenceService} from '../../../core/service/persistence.service';

@Component({
    selector: 'app-profile',
    templateUrl: './myprofile.component.html',
    styleUrls: ['./myprofile.component.scss']
})

export class MyProfileComponent implements OnInit {
    id: any;
    user: UserModel;
    email: string;
    constructor(
        private activateRoute: ActivatedRoute,
        private userService: UserService,
        private router: Router,
        private persistenceService: PersistenceService
    ) {
        this.email = this.persistenceService.get('HEADER_USER');
        this.userService.getUserIdByEmail(this.email).subscribe(res => {
            this.id = res;
            this.persistenceService.set('USER_ID', this.id)
        });
        console.log(this.persistenceService.get('USER_ID'))
        this.userService.getUserDetailsById(this.persistenceService.get('USER_ID')).subscribe(res => {
            this.user = res;
        })
    }

    home() {
        this.router.navigateByUrl('/home');
    }

    ngOnInit() {}

}
