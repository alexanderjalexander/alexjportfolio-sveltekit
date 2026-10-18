import type { SkillCategoriesMap, ColorCategorizedSkill } from '../../types/skills';
import { getSkillsCategories } from '../repos/skills.repo';
import { SKILLS_COLORS } from '../../config/theme';

export async function getSkillsCategoriesMap(): Promise<SkillCategoriesMap> {
	const skillsCategories = await getSkillsCategories();

	const result: SkillCategoriesMap = {};

	let i = 0;
	const colors = SKILLS_COLORS;

	for (const row of skillsCategories) {
		if (!result[row.category]) {
			result[row.category] = {
				color: colors[i % colors.length],
				skills: []
			};
			i++;
		}
		result[row.category].skills.push(row.skill);
	}

	return result;
}

export async function getColorCategorizedSkills(): Promise<ColorCategorizedSkill[]> {
	const skillsCategories = await getSkillsCategoriesMap();
	const result: ColorCategorizedSkill[] = [];

	for (const category of Object.keys(skillsCategories)) {
		const color = skillsCategories[category].color;
		for (const skill of skillsCategories[category].skills) {
			result.push({
				color,
				skill
			});
		}
	}

	return result;
}
