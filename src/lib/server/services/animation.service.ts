import { getAnimationProjects } from '../repos/animation.repo';
import { getColorCategorizedSkills } from '../services/skills.service';
import type { AnimationProjectDto } from '../../types/animation';

export async function getAnimationProjectsWithColoredSkills(): Promise<AnimationProjectDto[]> {
	const projects = await getAnimationProjects();
	const skillsColored = await getColorCategorizedSkills();

	return projects.map((project) => ({
		...project,
		skills: project.skills.map((skill) => {
			return {
				color: skillsColored.filter((cs) => cs.skill === skill)[0].color,
				skill
			};
		})
	}));
}
