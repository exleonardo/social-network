import s from '../ProfileInfo/profileInfo.module.scss'

export const Contact = ({ contactTitle, contactValue }: ContactType) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  )
}
type ContactType = {
  contactTitle: string
  contactValue: null | string
}
