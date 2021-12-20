import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../core/service/auth.service';
import {UserService} from '../../../core/service/user.service';
import {UserModel} from '../../../core/model/User.model';
import {PersistenceService} from '../../../core/service/persistence.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  recList: UserModel[];
  totalCards: number = this.arr.length;
  currentPage = 1;
  pagePosition = '0%';
  cardsPerPage: number;
  totalPages: number;
  overflowWidth: string;
  cardWidth: string;
  email: string;
  containerWidth: number;
  @ViewChild('container', { static: true, read: ElementRef })
  container: ElementRef;
  @HostListener('window:resize') windowResize() {
    const newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage !== this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }

  constructor(
      private authService: AuthService,
      private persistenceService: PersistenceService,
      private userService: UserService,
      private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(value => {
      if (value) {
        this.email = value.email;
      }
    });
    if (this.email == null) {
      this.email = this.persistenceService.get('HEADER_USER');
    }
    this.cardsPerPage = this.getCardsPerPage();
    this.initializeSlider();
    if (this.persistenceService.get('HEADER_USER') !== null || this.email !== null) {
        this.getRecList();
      }
  }
  getRecList() {
    this.userService.getRecommendList(this.email).subscribe(res => {
      this.recList = res;
    });
  }
  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages *
    10}px)`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage *
    10}px) / ${this.cardsPerPage})`;
  }

  viewProfile(id: number) {
    this.router.navigateByUrl('/user-profile/' + id);
  }

  getCardsPerPage() {
    return Math.floor(this.container.nativeElement.offsetWidth / 200);
  }

  changePage(incrementor) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${10 *
    (this.currentPage - 1)}px)`;
  }

}
