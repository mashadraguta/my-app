

import React, { ChangeEvent, Component } from 'react';
import s from './ProfileStatus.module.css'


type PropsType = {
    userStatus: string
    updateStatusThunkCreator: (userStatus: string) => void
}

type StateType = {
    editMode: boolean
    userStatus: string
}

class ProfileStatus extends Component<PropsType, StateType> {

    state = {
        editMode: false,
        userStatus: this.props.userStatus,
    }


    activateEditMode = () => {

        this.setState({
            editMode: true,
        })


    }

    deactivateEditMode = () => {

        this.setState({
            editMode: false,
        })
        this.props.updateStatusThunkCreator(this.state.userStatus)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            userStatus: e.currentTarget.value,
        })


    }

    componentDidUpdate = (prevProps: PropsType, prevState: StateType) => {

        if (prevProps.userStatus !== this.props.userStatus) {
            this.setState({
                userStatus: this.props.userStatus
            })
        }
    }
    render() {

        return (
            <div className={s.wrapper}>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>
                            {this.props.userStatus || "no more crying in the rain"}
                        </span>
                    </div>
                }
                {this.state.editMode &&

                    <div><input onBlur={this.deactivateEditMode}
                        autoFocus={true}
                        onChange={this.onStatusChange}
                        value={this.state.userStatus}></input></div>
                }

            </div>

        );
    }
}

export default ProfileStatus;
