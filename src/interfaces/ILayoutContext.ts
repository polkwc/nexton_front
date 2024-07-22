import { INotification } from "./INotifications";

export type ILayouContext = {
  notifications: INotification[];
  sendNotification: (notification: INotification) => void;
  removeNotification: (id: string) => void;
}