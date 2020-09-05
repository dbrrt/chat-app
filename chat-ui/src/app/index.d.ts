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
    sender: string;
    isSender: boolean;
    isRecipient: boolean;
    messageType: string;
    messagePayload: string;
    formatDate: string;
}