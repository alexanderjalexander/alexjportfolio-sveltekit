import { db } from '../db';
import { getS3Client } from '../blob';
import { skills, workExperienceJobs, workExperienceSkills } from '../db/migrations/schema';

import { desc, eq } from 'drizzle-orm';
import { GetObjectCommand } from '@aws-sdk/client-s3';

const s3 = getS3Client();

export async function getWorkExperienceS3Object(key: string) {
	const command = new GetObjectCommand({
		Bucket: process.env.WORK_BUCKET_NAME!,
		Key: key
	});
	const data = await s3.send(command);
	return data;
}

export async function getWorkExperienceJobRows() {
	return db
		.select()
		.from(workExperienceJobs)
		.orderBy(desc(workExperienceJobs.jobStartDate), desc(workExperienceJobs.jobEndDate));
}

export async function getWorkExperienceSkillRows() {
	return db
		.select({
			job: workExperienceSkills.job,
			skill: skills.skill
		})
		.from(workExperienceSkills)
		.innerJoin(skills, eq(skills.id, workExperienceSkills.skill));
}

export async function getResumeFromS3() {
	const command = new GetObjectCommand({
		Bucket: process.env.RESUME_BUCKET_NAME!,
		Key: 'resume.pdf'
	});
	const data = await s3.send(command);
	return data;
}
