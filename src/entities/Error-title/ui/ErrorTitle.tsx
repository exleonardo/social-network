import s from '../style/index.module.scss'

type ErrorTitleType = {
  title: string
}
export const ErrorTitle = ({ title }: ErrorTitleType) => {
  return <div className={s.errorTitle}>{title}</div>
}
