import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty({ message: "Image is required" })
  image: string;

  @IsString()
  @IsNotEmpty({ message: "Title is required" })
  title: string;

  @IsString()
  @IsNotEmpty({ message: "Author is required" })
  author: string;

  @IsString()
  @IsNotEmpty({ message: "Release Date is required" })
  releaseDate: Date;

  @IsString()
  @IsNotEmpty({ message: "Gender is required" })
  gender: string;

  @IsString()
  @IsNotEmpty({ message: "Sinopse is required" })
  sinopse: string;
}

export class UpdateBookDTO extends CreateBookDto {}
