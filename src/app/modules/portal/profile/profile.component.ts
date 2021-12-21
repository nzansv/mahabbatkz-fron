import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '../../../core/model/User.model';
import {UserService} from '../../../core/service/user.service';
import {Observable} from 'rxjs';
import {MatchService} from '../../../core/service/match.service';
import {MatchModel} from '../../../core/model/Match.model';
import {PersistenceService} from '../../../core/service/persistence.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    id: number;
    user: UserModel;
    matchModel: { receiverId: number; senderEmail: string } = { receiverId: 0, senderEmail: ''};

    constructor(
        private activateRoute: ActivatedRoute,
        private userService: UserService,
        private matchService: MatchService,
        private persistenceService: PersistenceService
    ) {
        this.id = this.activateRoute.snapshot.params.id;
        this.userService.getUserDetailsById(this.id).subscribe(res => {
            this.user = res;
        })
    }

    match(id: number) {
        this.matchModel.senderEmail = this.persistenceService.get('HEADER_USER');
        this.matchModel.receiverId = id;
        this.matchService.createMatch(this.matchModel).subscribe( res => {
            console.log(res)
        })
    }

    ngOnInit() {}

}
