import React from 'react';

type ProfileStatusType = {
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState ( {
            editMode: !this.state.editMode
        } )
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus onBlur={this.activateEditMode} value={this.props.status}/>
                    </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;