import { BadRequestException, Injectable } from "@nestjs/common";
import { BookEntity } from "src/entities/book";
import { DataSource, Repository } from "typeorm";

import { CreateBookDto, UpdateBookDTO } from "./book.dto";

@Injectable()
export class BookService {
  private bookRepository: Repository<BookEntity>;
  constructor(private dataSource: DataSource) {
    this.bookRepository = this.dataSource.getRepository(BookEntity);
  }
  async createBook(payload: CreateBookDto) {
    const bookCreated = await this.bookRepository.findOneBy({ title: payload.title });

    if (bookCreated) throw new BadRequestException("Book already exists");

    payload.releaseDate = new Date(payload.releaseDate);

    return this.bookRepository.save(payload);
  }

  async findBook(bookId: number) {
    if (!bookId) throw new BadRequestException("Param is required");

    const book = await this.bookRepository.findOneBy({ id: bookId });

    if (!book) throw new BadRequestException("Book not found");

    return book;
  }

  async findBooks() {
    return this.bookRepository.find();
  }

  async updateBook(bookId: number, payload: UpdateBookDTO) {
    if (!bookId) throw new BadRequestException("Param is required");

    const book = await this.bookRepository.findOneBy({ id: bookId });

    if (!book) throw new BadRequestException("Book not found");

    return this.bookRepository.update({ id: bookId }, payload);
  }

  async inactivateBook(bookId: number) {
    if (!bookId) throw new BadRequestException("Param is required");

    const book = await this.bookRepository.findOneBy({ id: bookId });

    if (!book) throw new BadRequestException("Book not found");

    return this.bookRepository.update({ id: bookId }, { deleted_at: new Date() });
  }
}
