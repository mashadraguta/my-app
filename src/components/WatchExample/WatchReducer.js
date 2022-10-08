let payload;

export const initialStateWatch = {
  isRunning: false,
  time: 0,
};

export const watchReducer = (state, action) => {
  switch (action.type) {
    case "start":
      return { ...state, isRunning: true };

    case "stop":
      return { ...state, isRunning: false };
    case "reset":
      return { isRunning: false, time: 0 };
    case "tick":
      return { ...state, time: state.time + 1 };

    default:
      throw new Error();
  }
};

// const action = {
//   start: { type: "start" },
//   stop: { type: "stop" },
//   reset: { type: "reset" },
//   tick: { type: "tick" },
// };
