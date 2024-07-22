import { actionLayout } from '../actions/Layout';
import { ILayouContext } from '../interfaces/ILayoutContext';
import { INotification } from '../interfaces/INotifications';
import { types } from '../types/Layout';

export default (state: ILayouContext, action: actionLayout) => {
  switch (action.type) {
    case types.removeNotification:
      const p2 = state.notifications.filter((i: any) => i.status !== 'runned');
      return { ...state, notifications: p2 };

    case types.sendNotification:
      const p = [...state.notifications];
      p.push(<INotification>action.payload);
      return { ...state, notifications: p };
    default:
      return state;
  }
};
