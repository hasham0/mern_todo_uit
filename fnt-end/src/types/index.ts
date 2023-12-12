export interface todoTs {
  _id?: string;
  task: string;
  status: boolean;
}

export type responseTodo = {
  message: string;
  data: todoTs[];
};
