import React from "react";
import { InjectedCounterProps, makeCounter } from "./hocExample";


interface CounterProps extends InjectedCounterProps {
    style?: React.CSSProperties;
}

const Counter = (props: CounterProps) => (
    <div style={props.style}>
        <button onClick={props.onDecrement}> - </button>
        {props.value}
        <button onClick={props.onIncrement}> + </button>
    </div>
);

export default makeCounter(Counter);