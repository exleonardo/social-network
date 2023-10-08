import React , {ChangeEvent} from 'react';

type ProfileStatusType = {
    status: string;
    updateStatus: (status: string) => void;
}
type LocalStateType = {
    editMode: boolean;
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusType> {

    state: LocalStateType = {
        editMode: false ,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState ( {
            editMode: !this.state.editMode ,
        } )
        this.props.updateStatus ( this.state.status )
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        if ( e.currentTarget.value.length <= 300 ) {
            this.setState ( {
                status: e.currentTarget.value
            } )
        }
    }

    componentDidUpdate(prevProps: ProfileStatusType , prevState: LocalStateType) {
        if ( prevProps.status !== this.props.status ) {
            this.setState ( { status: this.props.status } )
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span
                            onDoubleClick={this.activateEditMode}>{this.props.status || 'Enter status'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus onBlur={this.activateEditMode}
                               value={this.state.status}/>
                        <div>{this.state.status.length}/300</div>
                    </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;