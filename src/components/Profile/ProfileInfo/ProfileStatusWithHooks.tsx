import React , {ChangeEvent , memo , useEffect , useState} from 'react';
import {useAppDispatch , useAppSelector} from "../../../redux/redux-store";
import {getStatusProfile} from "../profile-selector";
import {updateStatus} from "../../../redux/profile-reducer";
import {Button , Input , message} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {getUsersId} from "../../Users/users-selectors";
import {useLocation} from "react-router-dom";
import {getCurrentUserId} from "../../Login/login-selectors";


const ProfileStatusWithHooks = memo ( () => {
  const statusProfile = useAppSelector ( getStatusProfile )
  const dispatch = useAppDispatch ()
  const [state , setState] = useState ( false );
  const [status , setStatus] = useState ( statusProfile );
  const [messageApi , contextHolder] = message.useMessage ();
  const location = useLocation ();

  const userId = useAppSelector ( getUsersId )
  const currentUserId = useAppSelector ( getCurrentUserId )

  console.log ( userId )
  console.log ( currentUserId )


  const error = (message: string) => {
    messageApi.open ( {
      type: 'error' ,
      content: `${message}` ,
    } );
  };


  useEffect ( () => {
    setStatus ( statusProfile )
  } , [statusProfile] );


  const activateEditMode = () => {
    setState ( !state )
    dispatch ( updateStatus ( status ) ).catch ( err => {
      error ( err )
    } )


  }
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    if ( e.currentTarget.value.length <= 300 ) {
      setStatus ( e.currentTarget.value )
    }
  }

  return (
    <div style={{ marginTop: '10px' }}>
      {contextHolder}
      {!state &&
          <div>
              <b>Status:</b> <span
          >{statusProfile || 'Enter status'}</span>
            {userId === currentUserId && <Button onClick={activateEditMode}
                                                 icon={<EditOutlined rev={undefined}/>}></Button>}
          </div>
      }
      {state &&
          <div>
              <Input showCount maxLength={300} onChange={onStatusChange} autoFocus onBlur={activateEditMode}
                     value={status}/>
          </div>
      }
    </div>
  );

} )

export default ProfileStatusWithHooks;