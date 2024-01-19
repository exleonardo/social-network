import { useHistory } from 'react-router-dom'

import { Button, Result } from 'antd'
import { ExceptionStatusType } from 'antd/es/result'

type ResultStatusType = {
  buttonTitle: string
  status: ExceptionStatusType
  subTitle: string
}
export const ResultStatus = ({ buttonTitle, status, subTitle }: ResultStatusType) => {
  const history = useHistory()
  const redirect = () => {
    if (status === '404') {
      history.push({
        pathname: '/',
      })
    }
    if (status === '403') {
      history.push({
        pathname: '/login',
      })
    }
  }

  return (
    <Result
      extra={
        <Button onClick={redirect} type={'primary'}>
          {buttonTitle}
        </Button>
      }
      status={status}
      subTitle={subTitle}
      title={status}
    />
  )
}
