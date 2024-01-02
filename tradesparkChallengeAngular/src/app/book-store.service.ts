import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private booksSubject = new BehaviorSubject<any[]>([]);
  books$ = this.booksSubject.asObservable();

  constructor(private client: HttpClient) { }

  getBooks(): Observable<any[]> {
    this.client.get<any[]>('http://localhost:8000/bookStore/books/')
      .subscribe((data: any) => {
        this.booksSubject.next(data);
      });
    return this.books$;
  }

  removeCategory(bookId: number, categoryName: string): Observable<any> {
    return this.client.post(`http://localhost:8000/bookStore/books/${bookId}/remove_category/`, { category_name: categoryName })
  }

}
