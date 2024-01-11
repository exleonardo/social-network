import React from 'react'

import s from '../ProfileInfo/profileInfo.module.scss'

export const Contact: React.FC<ContactType> = ({ contactTitle, contactValue }) => {
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
