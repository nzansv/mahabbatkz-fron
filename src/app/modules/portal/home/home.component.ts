import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../core/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  totalCards: number = this.arr.length;
  currentPage = 1;
  pagePosition = '0%';
  cardsPerPage: number;
  totalPages: number;
  overflowWidth: string;
  cardWidth: string;
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
      private authService: AuthService) { }

  ngOnInit(): void {
    this.cardsPerPage = this.getCardsPerPage();
    this.initializeSlider();
    console.log(this.authService.currentUserValueEmail)
  }
  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages *
    10}px)`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage *
    10}px) / ${this.cardsPerPage})`;
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
