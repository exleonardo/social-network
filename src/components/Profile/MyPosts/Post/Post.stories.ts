import { Meta, StoryObj } from '@storybook/react'

import Post from './Post'

const meta: Meta<typeof Post> = {
  component: Post,
  parameters: {
    layout: 'centered',
  },
  title: 'Profile/Post',
}

type Story = StoryObj<typeof Post>
export const PostProfile: Story = {
  args: {
    id: 1,
    likesCount: '10',
    message: 'New message',
  },
}
export default meta
