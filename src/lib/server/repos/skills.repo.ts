import { db } from '../db';
import { skills, categories, skillCategory } from '../db/migrations/schema';
import { SkillCategoryRow } from '../../types/skills';

import { eq } from 'drizzle-orm';

export async function getSkillsCategories(): Promise<SkillCategoryRow[]> {
	return await db
		.select({
			category: categories.category,
			skill: skills.skill
		})
		.from(skillCategory)
		.innerJoin(categories, eq(categories.id, skillCategory.category))
		.innerJoin(skills, eq(skills.id, skillCategory.skill));
}
