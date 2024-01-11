import { Redis } from 'ioredis';
import { promisify } from 'util';


const getRedisUrl = () => {
  if (process.env.TEST_REDIS_URL as string) {
    return process.env.TEST_REDIS_URL! as string;
  }
  throw new Error('REDIS url is not defined');
};

const getRedisRestUrl = () => {
    if(process.env.UPSTASH_REDIS_REST_URL as string){
        return process.env.UPSTASH_REDIS_REST_URL! as string
    }
    throw new Error('REDIS Rest url is not defined');
}

const getRedisRestToken = () => {
    if(process.env.UPSTASH_REDIS_REST_TOKEN as string){
        return process.env.UPSTASH_REDIS_REST_TOKEN! as string
    }
    throw new Error('REDIS Rest Token is not defined');
}
const testCS = 'asc.redis.cache.windows.net:6380,password=WkNZ3jUn3RSdqKAWnJbxjVM339P0fIV4vAzCaCs1PGE=,ssl=True,abortConnect=False'
const azureRedisOptions = {
  host: 'asc.redis.cache.windows.net',
  port: 6379, // or 6379 for non-TLS connection
  password: 'WkNZ3jUn3RSdqKAWnJbxjVM339P0fIV4vAzCaCs1PGE=',

}
const redis = new Redis(getRedisUrl());
const redisRestUrl = getRedisRestUrl()
const redisRestToken = getRedisRestToken()

const redisGet = promisify(redis.get).bind(redis);
const redisSet = promisify(redis.set).bind(redis);
const redisAppend = promisify(redis.append).bind(redis);
const redisHSet = promisify(redis.hset).bind(redis); // Add this line

const fetchRedisCache = async () => {
const res = fetch(redisRestUrl, {
    headers: {
      Authorization: `Bearer ${redisRestToken}`
    }})
}

async function redisUpdate(hashName: string, field: string, value: string) {
  await redis.hset(hashName, field, value);
}

export { redisAppend, redisGet, redisSet, redisUpdate, redis, redisRestToken, redisRestUrl, fetchRedisCache };