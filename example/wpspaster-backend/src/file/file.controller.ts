/*
 * @Author: lifuhai
 * @Date: 2023-04-20 23:52:59
 * @LastEditTime: 2023-10-20 15:40:22
 * @LastEditors: lifuhai
 * @Description:
 */
import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { Express, Response } from 'express';

@Controller('file')
export class FileController {
  //上传图片
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = `${Date.now()}.png`;

    const filePath = createWriteStream(join(__dirname, '../../public/resource/img', fileUrl));
    filePath.write(file.buffer);
    return {
      data: {
        fileUrl: '/wpspaster/file/img/' + fileUrl, //localhost
      },
      status: 200,
      message: '成功',
    };
  }

  //查看图片
  @Get('img/:id')
  public view(@Res() res: Response, @Param() params) {
    const filePath = join(__dirname, `../../public/resource/img/${params.id}`);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
    return;
  }
}
