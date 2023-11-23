import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AppResponse } from "src/app/model/appResponse";
import { Book } from "src/app/model/book";
import { Category } from "src/app/model/category";
import { CategoryService } from "src/app/service/category.service";
import { BookService } from "src/app/service/book.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
})
export class AdminProductComponent implements OnInit {
  products: Book[] = [];
  categories: Category[] = [];
  constructor(
    private bookService: BookService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (response: AppResponse) => {
        console.log(response.data);
        this.products = response.data;
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });

    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
  }

  addBook(productForm: NgForm) {
    let book: Book = {
      id: 0,
      author: productForm.value.author,
      description: productForm.value.description,
      price: parseFloat(productForm.value.price),
      title: productForm.value.product_name,
      categoryId: parseInt(productForm.value.product_categorie),
    };
    console.log(book);

    if (book.id === 0) {
      this.bookService.postBook(book).subscribe({
        next: (response: any) => {
          this.categories = response.data;
          productForm.resetForm();
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    } else {
      this.bookService.putBook(book).subscribe({
        next: (response: any) => {
          this.categories = response.data;
          productForm.resetForm();
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  }

  onEdit(category: any) {
    // this.categoryModel = category;
  }

  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.bookService.deleteBook(id).subscribe({
        next: (response: any) => {
          this.products = response.data;
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  }
}
