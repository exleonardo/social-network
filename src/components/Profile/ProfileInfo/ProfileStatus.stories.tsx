import {Meta , StoryObj} from "@storybook/react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {action} from '@storybook/addon-actions'

const meta: Meta<typeof ProfileStatusWithHooks> = {
    title: 'Profile/ProfileStatusWithHooks' ,
    component: ProfileStatusWithHooks ,
    parameters: {
        layout: 'centered' ,
    } ,
    tags: ['autodocs'] ,
};
type Story = StoryObj<typeof ProfileStatusWithHooks>

const changeStatus = action ( "status changed" )
export const ProfileStatusDefault: Story = {
    args: {
        status: 'New Status' ,
        updateStatus: changeStatus
    }
}
export default meta;