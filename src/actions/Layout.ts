import { INotification } from '../interfaces/INotifications';
import { types } from '../types/Layout';

export type NotificationAction =
| { type: types.removeNotification; payload: string }
| { type: types.sendNotification; payload: INotification };


export interface actionLayout {
  type: types,
  payload: string | INotification,
}

export const removeNotification = (id: string): actionLayout => ({
  type: types.removeNotification,
  payload: id,
});

export const sendNotification = (notification: INotification): actionLayout => ({
  type: types.sendNotification,
  payload: notification,
});
