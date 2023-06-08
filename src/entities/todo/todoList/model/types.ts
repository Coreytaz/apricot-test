export interface Todos {
  id: number;
  text: string;
  completed: boolean;
  children: Todos[];
}
