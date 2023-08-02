import { Inject, Injectable } from '@nestjs/common';

import filesConfig from 'src/config/filesConfig';
import { ConfigType } from '@nestjs/config';

import * as AWS from 'aws-sdk';

@Injectable()
export class FilesService {
  constructor(
    @Inject(filesConfig.KEY)
    readonly config: ConfigType<typeof filesConfig>,
  ) {}
  async uploadFile(file: Express.Multer.File) {
    //aws에 접근하기 위한 정보 및 액세스 키 등록
    AWS.config.update({
      region: this.config.awsRegion,
      credentials: {
        accessKeyId: this.config.awsAccessKey,
        secretAccessKey: this.config.awsSecretAccessKey,
      },
    });

    //AWS s3 객체 생성
    const upload = new AWS.S3();

    //파일 업로드시 필요한 정보들을 모아둔 객체 생성
    const params = {
      // 우리가 생성한 s3 버켓의 이름입니다.
      Bucket: this.config.awsS3Bucket,
      Key: file.originalname,
      Body: file.buffer,
    };

    //업로드 시도
    try {
      await upload.upload(params).promise();
    } catch (e) {
      throw new Error('Failed to upload file.');
    }
  }
}
