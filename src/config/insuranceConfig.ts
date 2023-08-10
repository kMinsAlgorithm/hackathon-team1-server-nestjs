import { registerAs } from '@nestjs/config';

export default registerAs('insurance-suggesters', () => ({
  recommendationUrl: process.env.RECOMMENDATION_URL,
}));
