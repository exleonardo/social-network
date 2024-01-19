import { Icon } from '@/shared/Icon/ui/Icon'

export const Contact = ({ contactTitle, contactValue }: ContactType) => {
  return (
    <a href={contactValue || '#'} rel={'noreferrer'} target={'_blank'}>
      <Icon name={contactTitle} />
    </a>
  )
}
type ContactType = {
  contactTitle: string
  contactValue: null | string
}
