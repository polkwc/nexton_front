import { FC, ReactNode, createContext, useReducer } from 'react';
import AppReducer from '../reducers/Layout';
import * as actions from '../actions/Layout';
import { ILayouContext } from '../interfaces/ILayoutContext';
import { INotification } from '../interfaces/INotifications';

const initialState: ILayouContext = {
  notifications: [],
  removeNotification: () => {},
  sendNotification: ()=>{}
};

export const LayoutContext = createContext<ILayouContext>(initialState);
export const LayoutProvider: FC<{children: ReactNode}> = ({children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function removeNotification(id: string) {
    dispatch(actions.removeNotification(id));
  }

  function sendNotification(notification: INotification) {
    dispatch(actions.sendNotification(notification));
  }

  return (
    <LayoutContext.Provider
      value={{
        notifications: state.notifications,
        sendNotification,
        removeNotification,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
