export interface IMessage {
    sender: string | null;
    recipient: string | null;
    message: {
        type: string;
        payload: string;
    }
    ts: string;
}

export interface IMessageTile {
    timestamp: string;
    username: string;
    message: IMessage;
    isSender: boolean;
    isRecipient: boolean;
}