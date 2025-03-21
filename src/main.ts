import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle("Story Game API").build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, documentFactory);

  // Настройка middleware
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: ["http://localhost:5173", "https://story-game.ru/", "http://story-game.ru/"],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err: unknown) =>
  console.error("Ошибка при запуске приложения:", err instanceof Error ? err.message : err)
);
