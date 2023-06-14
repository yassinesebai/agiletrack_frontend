import { Employee } from "./employee.model";
import { Project } from "./project.model";
import { Sprint } from "./sprint.model";

export class Task {
    id: number | null;
    summary: string;
    description: string;
    start_date: Date | null;
    end_date: Date | null;
    duration: number | null;
    status: string;
    priority: string;
    cost: number;
    employee: Employee | null;
    sprint: Sprint | null;
    project: Project;

    constructor(
        summary: string,
        description: string,
        start_date: Date | null,
        end_date: Date | null,
        duration: number | null,
        status: string,
        priority: string,
        cost: number,
        employee: Employee | null,
        sprint: Sprint | null,
        project: Project
    ) {
        this.summary = summary;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.duration = duration;
        this.status = status;
        this.priority = priority;
        this.cost = cost;
        this.employee = employee;
        this.sprint = sprint;
        this.project = project;
    }
}