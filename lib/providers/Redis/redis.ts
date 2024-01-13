import { Redis } from 'ioredis';
import { promisify } from 'util';
const port = process.env.NODE_ENV === 'development' ? '6379' : '6379';
const getRedisUrl = () => {
  if (process.env.AZURE_REDIS_URL as string) {
    return (process.env.AZURE_REDIS_URL! + port) as string;
  }
  throw new Error('REDIS url is not defined');
};

const getRedisRestUrl = () => {
  if (process.env.UPSTASH_REDIS_REST_URL as string) {
    return process.env.UPSTASH_REDIS_REST_URL! as string;
  }
  throw new Error('REDIS Rest url is not defined');
};

const getRedisRestToken = () => {
  if (process.env.UPSTASH_REDIS_REST_TOKEN as string) {
    return process.env.UPSTASH_REDIS_REST_TOKEN! as string;
  }
  throw new Error('REDIS Rest Token is not defined');
};

const redis = new Redis(getRedisUrl());
const redisRestUrl = getRedisRestUrl();
const redisRestToken = getRedisRestToken();

const redisGet = promisify(redis.get).bind(redis);
const redisSet = promisify(redis.set).bind(redis);
const redisAppend = promisify(redis.append).bind(redis);
const redisHSet = promisify(redis.hset).bind(redis); // Add this line

const fetchRedisCache = async () => {
  const res = fetch(redisRestUrl, {
    headers: {
      Authorization: `Bearer ${redisRestToken}`
    }
  });
};

async function redisUpdate(hashName: string, field: string, value: string) {
  await redis.hset(hashName, field, value);
}

export {
  fetchRedisCache, redis, redisAppend,
  redisGet, redisRestToken,
  redisRestUrl, redisSet,
  redisUpdate
};
