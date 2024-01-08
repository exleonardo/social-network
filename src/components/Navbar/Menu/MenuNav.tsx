import {
  BookOutlined ,
  MessageOutlined , PlayCircleOutlined ,
  StepForwardOutlined ,
  UserOutlined ,
  VideoCameraOutlined
} from "@ant-design/icons";
import {Menu} from "antd";
import React from "react";
import s from './MenuNav.module.css'

import {useHistory} from "react-router-dom";

export const MenuNav = () => {
  const history = useHistory ();
  const moveToPage = (event: { key: string }) => {
    history.push ( `/` )
    history.push ( `${event.key}` )
  }
  return (
    <Menu
      className={s.menu}
      onClick={moveToPage}
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['profile']}
      items={[
        {
          key: 'profile' ,
          icon: <UserOutlined rev={undefined}/> ,
          label: 'Profile' ,
        } ,
        {
          key: 'users' ,
          icon: <VideoCameraOutlined rev={undefined}/> ,
          label: 'Users' ,
          children: ''
        } ,
        {
          key: 'dialogs' ,
          icon: <MessageOutlined rev={undefined}/> ,
          label: 'Message' ,
        } ,
        {
          key: 'news' ,
          icon: <BookOutlined rev={undefined}/> ,
          label: 'News' ,
        } ,
        {
          key: 'music' ,
          icon: <StepForwardOutlined rev={undefined}/> ,
          label: 'Music' ,
        } ,
        {
          key: 'video' ,
          icon: <PlayCircleOutlined rev={undefined}/> ,
          label: 'Video' ,
        } ,

      ]}
    />
  );
};


