import { getMotionGraphics } from '../repos/motion-graphics.repo';
import { getColorCategorizedSkills } from '../services/skills.service';
import type { MotionGraphicsProjectDto } from '../../types/motion-graphics';

export async function getMotionGraphicsWithColoredSkills(): Promise<MotionGraphicsProjectDto[]> {
	const projects = await getMotionGraphics();
	const skillsColored = await getColorCategorizedSkills();
	projects.map((project) => {
		// @ts-expect-error usual type stuff from TS
		project.skills = project.skills.map((skill) => {
			return {
				color: skillsColored.filter((cs) => cs.skill === skill)[0].color,
				skill
			};
		});
	});

	// @ts-expect-error usual type stuff from TS
	return projects;
}
