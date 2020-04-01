export interface ChatModel {
    id : string;
    message : string;
    isMe : boolean;
    createdAt : string;
    type : 'human' | 'bot'   
}