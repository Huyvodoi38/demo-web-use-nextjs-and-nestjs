import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get, Query, Post, Body, Res } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Response } from 'express';
import { configSwagger } from './api-docs.config';

// Định nghĩa controller chính của ứng dụng
@Controller()
class AppController {
  // Định nghĩa endpoint GET /hello
  @Get('hello')
  getHello() {
    return 'Hello everyone'; // Trả về chuỗi "Hello everyone"
  }

  // Định nghĩa endpoint GET /dog
  @Get('dog')
  getDog(@Res() res: Response) {
    const imagePath = 'C:/Users/DELL/my-web/back-end-nestJS/data/meme-cho-shiba-49.webp'; // Đường dẫn tới ảnh của bạn 
    return res.sendFile(imagePath); // Gửi tệp ảnh về client
  }

  // Định nghĩa endpoint GET /cat
  @Get('cat')
  getCat(@Res() res: Response) {
    const imagePath = 'C:/Users/DELL/my-web/back-end-nestJS/data/Meme_meo_tang_hoa_4_33eea46670.jpg'; // Đường dẫn tới ảnh của bạn 
    return res.sendFile(imagePath); // Gửi tệp ảnh về client
  }

  // Định nghĩa endpoint GET /sum
  @Get('sum')
  getSum(@Query('a') a: string, @Query('b') b: string) {
    const sum = parseInt(a) + parseInt(b); // Tính tổng của hai số a và b
    return { sum }; // Trả về kết quả tổng dưới dạng JSON
  }

  // Định nghĩa endpoint POST /echo
  @Post('echo')
  postEcho(@Body('text') text: string) {
    return { echoedText: text }; // Trả về văn bản đã nhận dưới dạng JSON
  }
}

// Định nghĩa module chính của ứng dụng
@Module({
  controllers: [AppController], // Đăng ký controller với module
})
class AppModule {}

// Hàm khởi động ứng dụng
async function bootstrap() {
  const server = express(); // Tạo một instance của Express
  server.use(bodyParser.json()); // Sử dụng body-parser để phân tích cú pháp JSON
  server.use(cors()); // Sử dụng CORS để cho phép truy cập từ các nguồn khác
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  configSwagger(app); // Cấu hình Swagger
  await app.listen(3001); // Lắng nghe kết nối trên cổng 3001
}
bootstrap(); // Gọi hàm khởi động ứng dụng
