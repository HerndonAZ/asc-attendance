import { Redis } from 'ioredis';

// Azure requires 6380 for secure connections. 
const port = process.env.REDIS_PORT || '6380';

const getRedisUrl = () => {
  const baseUrl = process.env.AZURE_REDIS_URL;
  if (!baseUrl) {
    const error = new Error('REDIS url is not defined');
    console.error(error.message);
    throw error;
  }

  try {
    const url = new URL(baseUrl);
    // Azure requires the secure rediss protocol
    if (url.protocol === 'redis:') {
      url.protocol = 'rediss:';
    }
    url.port = port;
    return url; // Returning the URL object so we can use its hostname below
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

const redisUrlObj = getRedisUrl();

// Configured specifically for Azure Cache for Redis in a Serverless environment
const redis = new Redis(redisUrlObj.toString(), {
  tls: {
    // Azure SNI routing requires the servername to match the host
    servername: redisUrlObj.hostname, 
  },
  // Tells ioredis to timeout instead of hanging indefinitely initially
  connectTimeout: 10000,
  
  // Enables TCP Keep-Alive every 10 seconds to prevent Azure idle timeouts
  keepAlive: 10000, 
  
  // Don't crash immediately if a request fails, try again
  maxRetriesPerRequest: 3,
  
  // If the connection drops, tell ioredis how to reconnect automatically
  retryStrategy(times) {
    console.warn(`[Redis] Connection dropped. Reconnecting (attempt ${times})...`);
    // Reconnect with a slight delay, increasing up to 2 seconds max
    return Math.min(times * 50, 2000);
  }
});

// Suppress normal disconnect errors so they don't crash Vercel, 
// since our retryStrategy will handle getting us reconnected
redis.on('error', (err) => {
  if (err.message.includes('ECONNRESET')) {
    console.warn('[Redis] Connection reset by peer. ioredis will automatically reconnect.');
  } else {
    console.error('[Redis] Connection error:', err);
  }
});

const redisRestUrl = getRedisRestUrl();
const redisRestToken = getRedisRestToken();

// ioredis already returns Promises, no need to promisify
const redisGet = redis.get.bind(redis);
const redisSet = redis.set.bind(redis);
const redisAppend = redis.append.bind(redis);
const redisHSet = redis.hset.bind(redis);

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

// import { Redis } from 'ioredis';

// const port = process.env.REDIS_PORT || '6379';

// const getRedisUrl = () => {
//   const baseUrl = process.env.AZURE_REDIS_URL;
//   if (!baseUrl) {
//     const error = new Error('REDIS url is not defined');
//     console.error(error.message);
//     throw error;
//   }

//   try {
//     const url = new URL(baseUrl);
//     url.port = port;
//     return url.toString();
//   } catch (err) {
//     console.error('Invalid REDIS url', err);
//     throw err;
//   }
// };

// const getRedisRestUrl = () => {
//   const url = process.env.UPSTASH_REDIS_REST_URL;
//   if (!url) {
//     const error = new Error('REDIS Rest url is not defined');
//     console.error(error.message);
//     throw error;
//   }
//   return url;
// };

// const getRedisRestToken = () => {
//   const token = process.env.UPSTASH_REDIS_REST_TOKEN;
//   if (!token) {
//     const error = new Error('REDIS Rest Token is not defined');
//     console.error(error.message);
//     throw error;
//   }
//   return token;
// };

// const redis = new Redis(getRedisUrl());
// const redisRestUrl = getRedisRestUrl();
// const redisRestToken = getRedisRestToken();

// // ioredis already returns Promises, no need to promisify
// const redisGet = redis.get.bind(redis);
// const redisSet = redis.set.bind(redis);
// const redisAppend = redis.append.bind(redis);
// const redisHSet = redis.hset.bind(redis);

// const fetchRedisCache = async (): Promise<unknown | Error> => {
//   try {
//     const res = await fetch(redisRestUrl, {
//       headers: {
//         Authorization: `Bearer ${redisRestToken}`
//       }
//     });

//     if (!res.ok) {
//       throw new Error(`Request failed with status ${res.status}`);
//     }

//     return await res.json();
//   } catch (error) {
//     console.error('Failed to fetch Redis cache', error);
//     return error as Error;
//   }
// };

// async function redisUpdate(hashName: string, field: string, value: string) {
//   await redis.hset(hashName, field, value);
// }

// export {
//   fetchRedisCache,
//   redis,
//   redisAppend,
//   redisGet,
//   redisRestToken,
//   redisRestUrl,
//   redisSet,
//   redisUpdate
// };
