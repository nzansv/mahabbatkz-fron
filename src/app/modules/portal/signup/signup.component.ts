import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../core/service/auth.service';
import {Router} from '@angular/router';
import {PersistenceService} from '../../../core/service/persistence.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test: Date = new Date();
    focus;
    form: FormGroup;

    focus1;
    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private persistenceService: PersistenceService,
                private router: Router) {
        this.form = this.formBuilder.group({
            email: '',
            password: '',
        });
    }

    ngOnInit() {}

    loginUser() {
        this.authService.login(this.form.getRawValue().email, this.form.getRawValue().password);
        this.router.navigateByUrl('/home');
    }

}
