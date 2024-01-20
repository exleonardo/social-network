import { Button } from '@/shared/Button/ui/Button'
import { Input } from '@/shared/Input/ui/Input'
import { usePostForm } from '@/widgets/User-post-form/hooks/usePostForm'

type UserPostFormType = {
  className?: string
}
export const UserPostForm = ({ className }: UserPostFormType) => {
  const { formik } = usePostForm()

  return (
    <>
      {
        <form className={className} onSubmit={formik.handleSubmit}>
          <Input {...formik.getFieldProps('newPostText')} />
          <Button>Add Post</Button>
        </form>
      }
    </>
  )
}
