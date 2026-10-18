import { db } from '../db';
import { animationProjects, skills, animationSkills } from '../db/migrations/schema';
import { AnimationProject } from '../../types/animation';

import { desc, eq, sql } from 'drizzle-orm';

export async function getAnimationProjects(): Promise<AnimationProject[]> {
	return db
		.select({
			id: animationProjects.id,
			name: animationProjects.name,
			description: animationProjects.description,
			youtubeId: animationProjects.youtubeId,
			publishDate: animationProjects.publishDate,
			skills: sql<string[]>`array_agg(${skills.skill})`
		})
		.from(animationProjects)
		.innerJoin(animationSkills, eq(animationProjects.id, animationSkills.project))
		.innerJoin(skills, eq(animationSkills.skill, skills.id))
		.groupBy(
			animationProjects.id,
			animationProjects.name,
			animationProjects.description,
			animationProjects.youtubeId,
			animationProjects.publishDate
		)
		.orderBy(desc(animationProjects.publishDate));
}
