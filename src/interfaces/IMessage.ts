import { MessageTypeEnum } from "../helpers/Enums";

export interface IMessage {
  type: MessageTypeEnum;
  code: string;
  message: string;
  err?: Error
}
