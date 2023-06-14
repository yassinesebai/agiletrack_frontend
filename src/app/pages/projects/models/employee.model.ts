import { Job } from "./Job.model";
import { Project } from "./project.model";

export class Employee {
    id: number | null;
    username: string;
    password: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    image: string | null;
    job: Job | null;
    projects: Project[];

	constructor(id: number , username: string, password: string, email: string, first_name: string , last_name: string , image: string , job: Job , projects: Project[]) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.first_name = first_name;
		this.last_name = last_name;
		this.image = image;
		this.job = job;
		this.projects = projects;
	}
}