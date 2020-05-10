import moment from "moment";
import createDataContext from "./createDataContext";
import habitApi from "../api/habit";
import { navigate } from "../navigationRef";

const habitReducer = (state, action) => {
  switch (action.type) {
    case "fetch_habits":
      return action.payload;
    default:
      return state;
  }
};

const completeHabit = dispatch => {
  return async habitId => {
    try {
      const update = {
        $inc: { progress: 1 },
        $set: { lastUpdate: moment().format("L") }
      };
      const response = await habitApi.patch(`/habits/${habitId}`, { update });
      console.log(response.data);
    } catch {
      console.log("Error checking off habit");
    }
  };
};

const deleteHabit = dispatch => {
  return async habitId => {
    try {
      const response = await habitApi.delete(`/habits/${habitId}`);
      console.log(response.data);
    } catch (err) {
      console.log("Error deleting habit");
    }
  };
};

const acceptHabit = dispatch => {
  return async habitId => {
    try {
      const update = { $set: { status: 1 } };
      const response = await habitApi.patch(`/habits/${habitId}`, { update });
      console.log(response.data);
    } catch (err) {
      console.log("Error accepting habit invitation");
    }
  };
};

const inviteFriend = dispatch => {
  return async () => {};
};

const fetchHabits = dispatch => {
  return async () => {
    const response = await habitApi.get("/habits");
    dispatch({
      type: "fetch_habits",
      payload: { habits: response.data.habits, pending: response.data.pending }
    });
  };
};

const createHabit = dispatch => {
  return async ({ title, description }) => {
    // make api request to create a habit with that title and description
    try {
      await habitApi.post("/habits", { title, description });
      navigate("HabitList");
    } catch (err) {
      console.log(err);
    }
  };
};

export const { Provider, Context } = createDataContext(
  habitReducer,
  {
    createHabit,
    fetchHabits,
    acceptHabit,
    inviteFriend,
    deleteHabit,
    completeHabit
  },
  { habits: [], pending: [] }
);
