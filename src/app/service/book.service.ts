import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppResponse } from "../model/appResponse";
import { Observable } from "rxjs";
import { urlEndpoint } from "../utils/constant";
import { Book } from "../model/book";

@Injectable({
  providedIn: "root",
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/book/all`);
  }

  postBook(book: Book): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/book`,
      book
    );
  }

  putBook(book: Book): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/book`,
      book
    );
  }

  deleteBook(id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/book/${id}`
    );
  }
}
