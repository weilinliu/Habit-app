import createDataContext from "./createDataContext";
import habitApi from "../api/habit";
import { navigate } from "../navigationRef";

const friendReducer = (state, action) => {
  switch (action.type) {
    case "fetch_friends":
      return action.payload;
    default:
      return state;
  }
};

const deleteFriend = dispatch => {
  return async friendshipId => {
    try {
      const response = habitApi.delete(`/friends/${friendshipId}`);
    } catch (err) {
      console.log("Error deleting friend");
    }
  };
};

const acceptFriend = dispatch => {
  return async friendshipId => {
    try {
      const response = await habitApi.patch(`/friends/${friendshipId}`);
    } catch (err) {
      console.log("Error accepting friend request");
    }
  };
};

const addFriend = dispatch => {
  return async email => {
    try {
      const response = await habitApi.post("/friends", { email });
      console.log(response.data);
      navigate("FriendList");
    } catch (err) {
      console.log("Error adding friend");
    }
  };
};

const fetchFriends = dispatch => {
  return async () => {
    try {
      const response = await habitApi.get("/friends");
      dispatch({ type: "fetch_friends", payload: response.data });
    } catch (err) {
      console.log("Error fetching friends");
    }
  };
};

export const { Provider, Context } = createDataContext(
  friendReducer,
  { fetchFriends, addFriend, acceptFriend, deleteFriend },
  { friendships: [], pending: [] }
);
