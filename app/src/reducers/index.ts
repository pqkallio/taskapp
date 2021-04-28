import {
  combineReducers,
  CombinedState,
  ReducersMapObject,
  Action,
} from 'redux';
import type { initialState as initState } from 'src/store/initialState';

const applicationReducers = (
  initialState: typeof initState,
): ReducersMapObject<typeof initState> => ({
  tasks: (state = initialState.tasks || [], action: any) => {
    switch (action.type) {
      case 'tasks/put':
        return action.payload;
      default:
        return state;
    }
  },
});

export const rootReducer = (initialState: typeof initState) => (
  state: Readonly<typeof initState> = initialState,
  action: Action<any>,
): CombinedState<Readonly<typeof initState>> => {
  return combineReducers({ ...applicationReducers(state) })(state, action);
};
