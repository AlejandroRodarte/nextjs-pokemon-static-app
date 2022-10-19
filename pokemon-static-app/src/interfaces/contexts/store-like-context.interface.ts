import { ActionProps } from './action-props.interface';

export interface StoreLikeContext<State extends object, Action extends ActionProps> {
  store: {
    state: State;
    dispatch: React.Dispatch<Action>;
  };
}
