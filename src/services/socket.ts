import { Socket } from "socket.io-client";
import { Classroom, GradeStructureDetail } from "../slices/classroom-slice";
import { Notification } from "../slices/notification-slice";
import { User } from "../slices/user-slice";

export interface ServerToClientEvents {
    pushNotification: (notification: Notification) => void;
}

export interface Comment {
    idPerson: string;
    content: string;
}

export interface Post {
    _id?: string;
    idHomework?: GradeStructureDetail;
    idStudent?: string;
    comments?: Comment[];
    pointReview?: number;
    currentPoint?: number,
    explain?: string;
    title: string;
    finalizedPoint?: number;
    isFinalized: boolean;
};


export interface ClientToServerEvents {
    newUser: (userId: string) => void;
    sendCommentNotification: (
        payload: {
            user: User;
            post: Post;
            classroom: Classroom;
        },
        receivers: string[]
    ) => void;
    sendFinalizeNotification: (
        payload: {
            user: User;
            homeworkTitle: string;
            classroom: Classroom;
        },
        receivers: string[]
    ) => void;
    sendFinalizeReviewNotification: (
        payload: {
            user: User;
            classroom: Classroom;
            post: Post;
        },
        receivers: string[]
    ) => void;
    sendPostNotification: (
        payload: {
            user: User;
            classroom: Classroom;
            post: Post;
        },
        receivers: string[]
    ) => void;
    markSeen: (userId: string, notificationId: string) => void;

}


export const listenToNotification = (socket: Socket<ServerToClientEvents, ClientToServerEvents>, callback: any) =>
    socket.on("pushNotification", (notification: Notification) => {
        callback(notification)
    })

export const sendFinalizeAction = (socket: Socket<ServerToClientEvents, ClientToServerEvents>, payload: {
    user: User;
    homeworkTitle: string;
    classroom: Classroom;
}, receivers: string[]) => {
    socket.emit("sendFinalizeNotification", payload, receivers)
}

export const sendCommentAction = (socket: Socket<ServerToClientEvents, ClientToServerEvents>, payload: {
    user: User;
    post: Post;
    classroom: Classroom;
}, receivers: string[]) => {
    socket.emit("sendCommentNotification", payload, receivers)
}

export const sendCreatePostAction = (socket: Socket<ServerToClientEvents, ClientToServerEvents>, payload: {
    user: User;
    classroom: Classroom;
    post: Post;
}, receivers: string[]) => {
    socket.emit("sendPostNotification", payload, receivers)
}

export const sendFinalizeReviewAction = (socket: Socket<ServerToClientEvents, ClientToServerEvents>, payload: {
    user: User;
    classroom: Classroom;
    post: Post;
}, receivers: string[]) => {
    socket.emit("sendFinalizeReviewNotification", payload, receivers)
}