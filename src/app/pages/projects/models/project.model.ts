import { Employee } from "./employee.model";

export class Project {
  id: number;
  name: string;
  description: string;
  start_date: Date;
  estimated_end_date: Date;
  end_date: Date | null;
  is_completed: boolean;
  estimated_duration: number;
  duration: number | null;
  budget: number | null;
  cost: number | null;
  employees: Employee[];
  progress: number | null;
  remaining_days: number;
  total_tasks: number;
  done_tasks: number;

  constructor(
    id: number,
    name: string,
    description: string,
    start_date: Date,
    estimated_end_date: Date,
    end_date: Date,
    is_completed: boolean,
    estimated_duration: number,
    duration: number,
    budget: number,
    cost: number,
    employees: Employee[],
    progress: number,
    remaining_days: number,
    total_tasks: number,
    done_tasks: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.start_date = start_date;
    this.estimated_end_date = estimated_end_date;
    this.end_date = end_date;
    this.is_completed = is_completed;
    this.estimated_duration = estimated_duration;
    this.duration = duration;
    this.budget = budget;
    this.cost = cost;
    this.employees = employees;
    this.progress = progress;
    this.remaining_days = remaining_days;
    this.total_tasks = total_tasks;
    this.done_tasks = done_tasks;
  }
}
