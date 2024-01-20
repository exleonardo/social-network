import { memo } from 'react'

import { FindUser } from '@/features/Find-user/ui/FindUser'
import { UserSubscriptionSelect } from '@/features/User-subscription-select/ui/UserSubscriptionSelect'
import { useUserSearchForm } from '@/widgets/Users-search-form/hooks/useUserSearchForm'

import s from '../style/index.module.scss'

export const UsersSearchForm = memo(() => {
  const { formik, onSearch } = useUserSearchForm()

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={s.searchUser}>
        <FindUser onSearch={onSearch} {...formik.getFieldProps('term')} />
        <UserSubscriptionSelect
          isSubmitting={formik.isSubmitting}
          onSearch={onSearch}
          {...formik.getFieldProps('friend')}
        />
      </div>
    </form>
  )
})
