
import { Subtract } from 'utility-types';
import React from "react";
import Preloader, { Props } from "../components/common/Preloader";




// const withLoading = (Component) =>
//     class WithLoading extends React.Component {
//         render() {
//             const { loading, ...props } = this.props;
//             return loading ? <Preloader /> : <Component {...props} />;
//         }
//     };


interface WithLoadingProps {
  isFetching: boolean;
}


//  class component
// const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
//     class WithLoading extends React.Component<P & WithLoadingProps> {
//         render() {
//             const { isFetching, ...props } = this.props;
//             return isFetching ? <Preloader /> : <Component {...props as P} />;
//         }
//     };



//  function component

const withLoading = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> => ({
  isFetching,
  ...props
}: WithLoadingProps) =>
    isFetching ? <Preloader /> : <Component {...props as P} />;





export interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface MakeCounterState {
  value: number;
}

export const makeCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
) =>
  class MakeCounter extends React.Component<
    Subtract<P, InjectedCounterProps>,
    MakeCounterState
  > {
    state: MakeCounterState = {
      value: 0,
    };

    increment = () => {
      this.setState(prevState => ({
        value: prevState.value + 1,
      }));
    };

    decrement = () => {
      this.setState(prevState => ({
        value: prevState.value - 1,
      }));
    };

    render() {
      return (
        <Component
          {...this.props as P}
          value={this.state.value}
          onIncrement={this.increment}
          onDecrement={this.decrement}
        />
      );
    }
  };