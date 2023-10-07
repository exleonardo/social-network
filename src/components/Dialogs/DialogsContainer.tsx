import React from 'react';
import {InitialStateType , sendMessageCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose , Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import withAuthRedirect from "../../hoc/withAuthRedirect";

export type DialogsPropsType = MapStateDialogsType & MapDispatchDialogsType
export type MapStateDialogsType = {
    dialogsPage: InitialStateType;
}
const mapStateDialogsToProps = (state: AppStateType): MapStateDialogsType => {
    return {
        dialogsPage: state.dialogsPage ,
    }
}

export type MapDispatchDialogsType = {
    sendMessage: (newMessageBody: string) => void
}
const mapDispatchDialogsToProps = (dispatch: Dispatch): MapDispatchDialogsType => {
    return {
        sendMessage: (newMessageBody) => dispatch ( sendMessageCreator ( newMessageBody ) )
    }
}
export default compose<React.ComponentType> ( connect ( mapStateDialogsToProps , mapDispatchDialogsToProps ) , withAuthRedirect ) ( Dialogs )