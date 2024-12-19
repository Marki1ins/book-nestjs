import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        const error = {
          message: errors[0].constraints[Object.keys(errors[0].constraints)[0]],
          error: "Bad Request",
          statusCode: 400,
        };
        return new BadRequestException(error);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000).then(() => console.log("Server started on port 3000"));
}
bootstrap();
