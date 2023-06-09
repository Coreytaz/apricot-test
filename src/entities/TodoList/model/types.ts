export interface Todos {
  id: number;
  text: string;
  description?: string;
  completed: boolean;
  children: Todos[];
}
