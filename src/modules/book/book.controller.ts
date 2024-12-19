import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

import { BookService } from "./book.service";
import { CreateBookDto, UpdateBookDTO } from "./book.dto";

@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post("/")
  async createBook(@Body() payload: CreateBookDto) {
    return this.bookService.createBook(payload);
  }

  @Get("/")
  async findBooks() {
    return this.bookService.findBooks();
  }

  @Get("/:bookId")
  async findBook(@Param("bookId") bookId: number) {
    return this.bookService.findBook(bookId);
  }

  @Put("/:bookId")
  async updateBook(@Param("bookId") bookId: number, @Body() payload: UpdateBookDTO) {
    return this.bookService.updateBook(bookId, payload);
  }

  @Delete("/:bookId")
  async inactivateBook(@Param("bookId") bookId: number) {
    return this.bookService.inactivateBook(bookId);
  }
}
