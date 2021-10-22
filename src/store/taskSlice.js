import { createSlice, nanoid } from '@reduxjs/toolkit';

const createTask = (title) => ({
  id: nanoid(),
  title,
  completed: false,
  assignedTo: ''
});

const initialState = [
  createTask('Water the plants'),
  createTask('Clean the bathroom')
];

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add: (state, action) => {
      // ! {state: this.state || initialState, action:{ type: "tasks/add", ...action}}
      state.push(createTask(action.payload));
    },
    toggle: (state, action) => {
      // ! {state: this.state || initialState, action:{ type: "tasks/toggle", ...action}}
      const task = state.find((task) => task.id === action.payload.taskId);
      task.completed = action.payload.completed;
    },
    assignToUser: (state, action) => {
      // ! {state: this.state || initialState, action:{ type: "tasks/assignToUser", ...action}}
      console.log('action: ', action);
      const task = state.find((task) => task.id === action.payload.taskId);
      task.assignedTo = action.payload.humanId;
    }
  }
});
