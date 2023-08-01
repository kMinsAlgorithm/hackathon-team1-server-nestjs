import { registerAs } from '@nestjs/config';

export default registerAs('translate', () => ({
  naverClientId: process.env.NAVER_CLIENT_ID,
  naverClientSecret: process.env.NAVER_CLIENT_SECRET,
  naverTranslateUrl: process.env.NAVER_TRANSLATE_URL,
}));
