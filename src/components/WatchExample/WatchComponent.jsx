import { Button } from "@mui/material";
import React, { useReducer, useRef, useEffect } from "react";
import { initialStateWatch, watchReducer } from "./WatchReducer";

const WatchComponent = () => {
  const [state, dispatch] = useReducer(watchReducer, initialStateWatch);
  const idRef = useRef(0);
  useEffect(() => {
    if (!state.isRunning) {
      return;
    }
    idRef.current = setInterval(() => dispatch({ type: "tick" }), 500);
    return () => {
      clearInterval(idRef.current);
      idRef.current = 0;
    };
  }, [state.isRunning]);

  return (
    <div>
      {state.time}s
      <div>
        <Button
          variant="contained"
          color="success"
          onClick={() => dispatch({ type: "start" })}
        >
          Start
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          color="success"
          onClick={() => dispatch({ type: "stop" })}
        >
          Stop
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          color="success"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default WatchComponent;
