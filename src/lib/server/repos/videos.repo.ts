import { db } from '../db';
import { creators, videos } from '../db/migrations/schema';
import type { CommissionVideoRow, VideoWithDate } from '../../types/videos';

import { eq, isNull } from 'drizzle-orm';

export async function getPersonalVideoRows(): Promise<VideoWithDate[]> {
  return db
    .select({
      url: videos.youtubeId,
      date: videos.publishDate
    })
    .from(videos)
    .where(isNull(videos.commissionFor))
    .orderBy(videos.publishDate);
}

export async function getCommissionVideoRows(): Promise<CommissionVideoRow[]> {
  return db
    .select({
      person: creators.name,
      personId: creators.channelId,
      url: videos.youtubeId,
      isShort: videos.isShort,
      date: videos.publishDate
    })
    .from(creators)
    .innerJoin(videos, eq(videos.commissionFor, creators.id))
    .orderBy(creators.name, videos.publishDate);
}
