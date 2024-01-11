import React from 'react'
import { NavLink } from 'react-router-dom'

import s from '../dialogs.module.scss'

type DialogItemType = {
  id: string
  name: string
}
export const DialogItem = (props: DialogItemType) => {
  const { id, name } = props
  const path = `/dialogs/${id}`

  return (
    <div className={s.dialog}>
      <NavLink activeClassName={s.active} to={path}>
        {name}
      </NavLink>
    </div>
  )
}

export default DialogItem
