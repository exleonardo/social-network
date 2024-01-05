import React from "react";
import s from "../ProfileInfo/ProfileInfo.module.css";

export const Contact: React.FC<ContactType> = ({ contactTitle , contactValue }) => {
  return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}
type ContactType = {
  contactTitle: string;
  contactValue: string | null
}