import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

export type PostsType = {
    id: string;
    message: string;
    likesCount: string
}
const posts: PostsType[] = [
    {id: "1", message: "Hi how are you", likesCount: "1"},
    {id: "2", message: "It's my post ", likesCount: "23"}
]

export type DialogsType = { id: string, name: string }
export type MessagesType = { id: string; message: string }
const dialogs: DialogsType[] = [
    {id: "1", name: "Dimych"},
    {id: "2", name: "Andrey"},
    {id: "3", name: "Svaeta"},
    {id: "4", name: "Victor"},
    {id: "5", name: "Valera"}
];
const messages: MessagesType[] = [
    {id: "1", message: "Hi"},
    {id: "2", message: "How is you it-camasutra"},
    {id: "3", message: "yo"}
]
ReactDOM.render(
    <App posts={posts} messages={messages} dialogs={dialogs} />,
  document.getElementById('root')
);