import {Meta , StoryObj} from "@storybook/react";
import Post from "./Post";

const meta: Meta<typeof Post> = {
    title: 'Profile/Post' ,
    component: Post ,
    parameters: {
        layout: 'centered' ,
    } ,
  
};
type Story = StoryObj<typeof Post>
export const PostProfile: Story = {
    args: {
        id: 1 ,
        message: 'New message' ,
        likesCount: '10' ,
    }
}
export default meta;