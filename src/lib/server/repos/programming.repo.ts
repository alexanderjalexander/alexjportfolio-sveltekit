import { db } from '../db';
import { programmingProjects, programmingSkills, skills } from '../db/migrations/schema';

import { eq } from 'drizzle-orm';

export async function getProgrammingProjects() {
	return db.select().from(programmingProjects);
}

export async function getProgrammingProjectSkills() {
	return db
		.select({
			project: programmingSkills.project,
			skill: skills.skill
		})
		.from(programmingSkills)
		.innerJoin(skills, eq(skills.id, programmingSkills.skill));
}
