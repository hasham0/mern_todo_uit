export interface todoTs {
  _id?: string;
  task: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export type responseTodo = {
  message: string;
  data: todoTs[];
};
