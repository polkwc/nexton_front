import { useContext } from 'react';
import { LayoutContext } from '../../context/Layout';
import { v4 as uuidv4 } from 'uuid';
import { MessageTypeEnum } from '../../helpers/Enums';
import { INotification } from '../../interfaces/INotifications';
import { IMessage } from '../../interfaces/IMessage';

export const useNotification = () => {
  const STATUS_PENDING = 'pending';
  const { sendNotification } = useContext(LayoutContext);

  const setNotification = (notification: string, type: number) => {
    switch (type) {
      case MessageTypeEnum.info:
        setInfoNotification(notification);
        return;
      case MessageTypeEnum.success:
        setSuccessNotification(notification);
        return;
      case MessageTypeEnum.error:
        setErrorNotification(notification);
        return;
      case MessageTypeEnum.warning:
        setWarningNotification(notification);
        return;
      case MessageTypeEnum.loading:
        setLoadingNotification(notification);
        return;
    }
  };

  const setNotificationMessage = (notification: IMessage) => {
    switch (notification.type) {
      case MessageTypeEnum.info:
        setInfoNotification(notification.message);
        return;
      case MessageTypeEnum.success:
        setSuccessNotification(notification.message);
        return;
      case MessageTypeEnum.error:
        setErrorNotification(notification.message);
        return;
      case MessageTypeEnum.warning:
        setWarningNotification(notification.message);
        return;
      case MessageTypeEnum.loading:
        setLoadingNotification(notification.message);
        return;
    }
  };

  const setInfoNotification = (notification: string) => {
    const id = uuidv4();
    const newNotification: INotification = {
      id,
      type: MessageTypeEnum.info,
      title: `Adding a new messsage`,
      description: notification,
      status: STATUS_PENDING,
    };
    finalSendNotification(newNotification);
  };

  const setSuccessNotification = (notification: string) => {
    const id = uuidv4();
    const newNotification: INotification = {
      id,
      type: MessageTypeEnum.success,
      title: `Adding a new  messsage`,
      description: notification,
      status: STATUS_PENDING,
    };
    finalSendNotification(newNotification);
  };

  const setErrorNotification = (notification: string) => {
    const id = uuidv4();
    const newNotification: INotification = {
      id,
      type: MessageTypeEnum.error,
      title: `Adding a new  messsage`,
      description: notification,
      status: STATUS_PENDING,
    };
    finalSendNotification(newNotification);
  };

  const setWarningNotification = (notification: string) => {
    const id = uuidv4();
    const newNotification: INotification = {
      id,
      type: MessageTypeEnum.warning,
      title: `Adding a new messsage`,
      description: notification,
      status: STATUS_PENDING,
    };
    finalSendNotification(newNotification);
  };

  const setLoadingNotification = (notification: string) => {
    const id = uuidv4();
    const newNotification: INotification = {
      id,
      type: MessageTypeEnum.loading,
      title: `Adding a new  messsage`,
      description: notification,
      status: STATUS_PENDING,
    };
    finalSendNotification(newNotification);
  };

  const finalSendNotification = (notification: INotification) => {
    if (sendNotification) {
      sendNotification(notification);
    }
  };

  return { setNotification, setNotificationMessage };
};
