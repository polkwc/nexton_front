import { IMessage } from "../interfaces/IMessage";
import { MessageTypeEnum } from "./Enums";

export const setErrorMessage = (message: string, code?: string, err?: Error): IMessage => {
    return {
        type: MessageTypeEnum.error,
        code: code ?? '500',
        message,
        err: err
    }
};
  
export const setSuccessMessage = (message: string): IMessage => {
    return {
        type: MessageTypeEnum.success,
        code: '200',
        message,
    }
};

export const setInfoMessage = (message: string, code?: string): IMessage => {
    return {
        type: MessageTypeEnum.info,
        code: code ?? '200',
        message,
    }
};

export const setWarningMessage = (message: string, code?: string): IMessage => {
    return {
        type: MessageTypeEnum.warning,
        code: code ?? '200',
        message,
    }
};
