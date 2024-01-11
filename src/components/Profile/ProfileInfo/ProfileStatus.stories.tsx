import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const meta: Meta<typeof ProfileStatusWithHooks> = {
  component: ProfileStatusWithHooks,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Profile/ProfileStatusWithHooks',
}

type Story = StoryObj<typeof ProfileStatusWithHooks>

const changeStatus = action('status changed')

export const ProfileStatusDefault: Story = {
  args: {
    status: 'New Status',
    updateStatus: changeStatus,
  },
}
export default meta
