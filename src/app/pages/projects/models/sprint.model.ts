import { Project } from "./project.model";

export class Sprint {
    id: number | null;
    name: string;
    goal: string;
    start_date: Date | null;
    estimated_end_date: Date | null;
    end_date: Date | null;
    estimated_duration: number | null;
    duration: number | null;
    status: string;
    project: Project;

    constructor(
        name: string,
        goal: string,
        start_date: Date | null,
        estimated_end_date: Date | null,
        end_date: Date | null,
        estimated_duration: number | null,
        duration: number | null,
        status: string,
        project: Project
    ) {
        this.name = name;
        this.goal = goal;
        this.start_date = start_date;
        this.estimated_end_date = estimated_end_date;
        this.end_date = end_date;
        this.estimated_duration = estimated_duration;
        this.duration = duration;
        this.status = status;
        this.project = project;
    }
}