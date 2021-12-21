import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from '../../../core/model/User.model';
import {UserService} from '../../../core/service/user.service';
import {Observable} from 'rxjs';
import {PersistenceService} from '../../../core/service/persistence.service';
import {MatchService} from '../../../core/service/match.service';
import {MatchModel} from '../../../core/model/Match.model';

@Component({
    selector: 'app-profile',
    templateUrl: './myprofile.component.html',
    styleUrls: ['./myprofile.component.scss']
})

export class MyProfileComponent implements OnInit {
    id: any;
    user: UserModel;
    email: string;
    myMatchRequests: UserModel[];
    myMatches: UserModel[];
    constructor(
        private activateRoute: ActivatedRoute,
        private userService: UserService,
        private router: Router,
        private persistenceService: PersistenceService,
        private matchService: MatchService
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

    getMyMatchRequests() {
        this.matchService.getMyMatchRequests(this.persistenceService.get('HEADER_USER')).subscribe(res => {
            this.myMatchRequests = res;
        })
    }

    getMyMatches() {
        this.matchService.getMyMatches(this.persistenceService.get('HEADER_USER')).subscribe(res => {
            this.myMatches = res;
        })
    }

    accept(id: number) {
        this.userService.getUserEmailById(id).subscribe( res => {
            this.email = res;
            const ans = this.matchService.answerToMatch(this.email, this.persistenceService.get('USER_ID'), 'ACCEPTED').subscribe(res => {
                console.log('---------->', res);
            });
        })
    }

    deny(id: number) {
        this.matchService.answerToMatch(this.persistenceService.get('HEADER_USER'), id, 'DECLINED')
    }

    ngOnInit() {
        this.getMyMatchRequests();
        this.getMyMatches();
    }

    viewProfile(id: number) {
        this.router.navigateByUrl('/user-profile/' + id);
    }

}
