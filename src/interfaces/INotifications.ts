import {MessageTypeEnum} from '../helpers/Enums';

export interface INotification {
    id: string;
    type: MessageTypeEnum;
    title: string;
    description: string;
    status: string;
}
