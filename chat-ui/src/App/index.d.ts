export interface IMessage {
    sender: string;
    recipient: string;
    message: {
        type: string;
        payload: string;
    }
}

export interface IContainer {
    messages: IMessage[]
}

export interface IMessageTile {
    timestamp: string;
    username: string;
    message: IMessage;
    isSender: boolean;
    isRecipient: boolean;
}
