import { Redis } from 'ioredis';
import { promisify } from 'util';

const port = process.env.REDIS_PORT || '6379';

const getRedisUrl = () => {
  const baseUrl = process.env.AZURE_REDIS_URL;
  if (!baseUrl) {
    const error = new Error('REDIS url is not defined');
    console.error(error.message);
    throw error;
  }

  try {
    const url = new URL(baseUrl);
    url.port = port;
    return url.toString();
  } catch (err) {
    console.error('Invalid REDIS url', err);
    throw err;
  }
};

const getRedisRestUrl = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  if (!url) {
    const error = new Error('REDIS Rest url is not defined');
    console.error(error.message);
    throw error;
  }
  return url;
};

const getRedisRestToken = () => {
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!token) {
    const error = new Error('REDIS Rest Token is not defined');
    console.error(error.message);
    throw error;
  }
  return token;
};

const redis = new Redis(getRedisUrl());
const redisRestUrl = getRedisRestUrl();
const redisRestToken = getRedisRestToken();

const redisGet = promisify(redis.get).bind(redis);
const redisSet = promisify(redis.set).bind(redis);
const redisAppend = promisify(redis.append).bind(redis);
const redisHSet = promisify(redis.hset).bind(redis); // Add this line

const fetchRedisCache = async (): Promise<unknown | Error> => {
  try {
    const res = await fetch(redisRestUrl, {
      headers: {
        Authorization: `Bearer ${redisRestToken}`
      }
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch Redis cache', error);
    return error as Error;
  }
};

async function redisUpdate(hashName: string, field: string, value: string) {
  await redis.hset(hashName, field, value);
}

export {
  fetchRedisCache,
  redis,
  redisAppend,
  redisGet,
  redisRestToken,
  redisRestUrl,
  redisSet,
  redisUpdate
};
