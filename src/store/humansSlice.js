import { createSlice, nanoid } from '@reduxjs/toolkit';
import { taskSlice } from './taskSlice';

const createHuman = (name) => ({
  id: nanoid(),
  name,
  taskIds: []
});

const initialState = [createHuman('walter'), createHuman('justin')];

export const humanSlice = createSlice({
  name: 'humans',
  initialState,
  reducers: {
    add: (state, action) => {
      // ! {state: this.state || initialState, action:{ type: "humans/add", ...action}}
      state.push(createHuman(action.payload));
    }
  },
  extraReducers: (builder) => {
    // ! {state: this.state || initialState, action:{ type: "tasks/assignToUser", ...action}}
    // ! Works like useEffect and prevents 2 different calls to redux
    // ! humanSlice is set to watch the taskSlice.assignToUser
    // ! whenever a task is assigned the humanSlice knows to add it to the human with the same id
    builder.addCase(taskSlice.actions.assignToUser, (state, action) => {
      for (const human of state) {
        if (human.id === action.payload.humanId) {
          human.taskIds.push(action.payload.taskId);
        } else {
          human.taskIds = human.taskIds.filter(
            (task) => task !== action.payload.taskId
          );
        }
      }
    });
  }
});
