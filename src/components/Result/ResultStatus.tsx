import {Button , Result} from "antd";
import React from "react";
import {useHistory} from "react-router-dom";
import {ExceptionStatusType} from "antd/es/result";

type  ResultStatus = {
  status: ExceptionStatusType
  subTitle: string
  buttonTitle: string
}
export const ResultStatus = ({ status , subTitle , buttonTitle }: ResultStatus) => {
  const history = useHistory ()
  const redirect = () => {
    if ( status === '404' ) {
      history.push ( {
        pathname: '/'
      } )
    }
    if ( status === '403' ) {
      history.push ( {
        pathname: '/login'
      } )
    }

  }
  return (
    <Result
      status={status}
      title={status}
      subTitle={subTitle}
      extra={<Button type="primary" onClick={redirect}>{buttonTitle}</Button>}
    />
  );
};
