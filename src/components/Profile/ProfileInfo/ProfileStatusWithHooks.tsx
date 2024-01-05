import React , {ChangeEvent , useEffect , useState} from 'react';
import {useAppDispatch , useAppSelector} from "../../../redux/redux-store";
import {getStatusProfile} from "../profile-selector";
import {updateStatus} from "../../../redux/profile-reducer";


const ProfileStatusWithHooks = () => {
  const statusProfile = useAppSelector ( getStatusProfile )
  const dispatch = useAppDispatch ()
  const [state , setState] = useState ( false );
  const [status , setStatus] = useState ( statusProfile );
  useEffect ( () => {
    setStatus ( statusProfile )
  } , [statusProfile] );
  const activateEditMode = () => {
    setState ( !state )
    dispatch ( updateStatus ( status ) )
  }
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    if ( e.currentTarget.value.length <= 300 ) {
      setStatus ( e.currentTarget.value )
    }
  }

  return (
    <div style={{ marginTop: '10px' }}>
      {!state &&
          <div>
              <b>Status:</b> <span
              onDoubleClick={activateEditMode}>{statusProfile || 'Enter status'}</span>
          </div>
      }
      {state &&
          <div>
              <input onChange={onStatusChange} autoFocus onBlur={activateEditMode}
                     value={status}/>
              <div>{status.length}/300</div>
          </div>
      }
    </div>
  );

}

export default ProfileStatusWithHooks;