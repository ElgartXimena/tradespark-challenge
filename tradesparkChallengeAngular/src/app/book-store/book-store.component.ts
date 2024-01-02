import { Component, OnInit } from '@angular/core';
import { BookStoreService } from '../book-store.service';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.css']
})
export class BookStoreComponent implements OnInit {

  books: any[] = [];
  filteredBooks: any[] = [];
  filter: string = '';
  selectedCategory: string = '';

  constructor(private bookStoreService: BookStoreService) { }

  ngOnInit(): void {
    this.bookStoreService.getBooks().subscribe((data: any[]) => {
      this.books = data; 
      this.filteredBooks = [...this.books];
    });
  }

  categoriesToString(categories: any[]): string {
    let categoriesString = "";
    categories.forEach((category, index) => {
      categoriesString += category.name;
      if (index < categories.length - 1) {
        categoriesString += ", ";
      }
    });
    return categoriesString;
  }

  applyFilter(): void {
    if (this.filter.trim() === '') {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().includes(this.filter.toLowerCase()) ||
        book.author.name.toLowerCase().includes(this.filter.toLowerCase()) ||
        this.categoriesToString(book.categories).toLowerCase().includes(this.filter.toLowerCase())
      );
    }
  }

  removeCategory(bookId: number, categoryName: string): void {
    this.bookStoreService.removeCategory(bookId, categoryName).subscribe(
      {
        next: () => {
          this.bookStoreService.getBooks().subscribe();
        }
      }
    );
  }

}
