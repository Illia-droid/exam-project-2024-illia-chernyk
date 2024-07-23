import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    throw new Error(err);
  }
};

const initialState = loadState() || {
  events: [],
  expiredEvents: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    createEvent(state, action) {
      const { body, deadline, userHours } = action.payload;
      const newTask = {
        id: uuidv4(),
        body,
        isExpired: false,
        deadline,
        createdAt: new Date().toISOString(),
        userHours,
      };
      state.events.push(newTask);
      saveState(state);
    },
    deleteEvent(state, action) {
      const { id } = action.payload;
      state.events = state.events.filter((event) => id !== event.id);
      state.expiredEvents = state.expiredEvents.filter(
        (expiredEvent) => id !== expiredEvent.id
      );
      saveState(state);
    },
    setIsExpired(state, action) {
      const { id } = action.payload;
      state.events = state.events.map((event) =>
        id === event.id ? { ...event, isExpired: !event.isExpired } : event
      );
      state.expiredEvents.push({ id });
      saveState(state);
    },
  },
});

export const { createEvent, deleteEvent, setIsExpired } = eventsSlice.actions;
export default eventsSlice.reducer;
