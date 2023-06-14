import { Employee } from "./employee.model";
import { Project } from "./project.model";

export class Team {
    id: number | null;
    employee: Employee;
    project: Project;

    constructor(employee: Employee, project: Project) {
        this.employee = employee;
        this.project = project;
	}
}