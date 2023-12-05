import React , {ChangeEvent , useEffect , useState} from 'react';


type ProfileStatusType = {
  status: string;
  updateStatus: (status: string) => void;
}
const ProfileStatusWithHooks = (props: ProfileStatusType) => {
  const [state , setState] = useState ( false );
  const [status , setStatus] = useState ( props.status );
  useEffect ( () => {
    setStatus ( props.status )
  } , [props.status] );
  const activateEditMode = () => {
    setState ( !state )
    props.updateStatus ( status )
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
              onDoubleClick={activateEditMode}>{props.status || 'Enter status'}</span>
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