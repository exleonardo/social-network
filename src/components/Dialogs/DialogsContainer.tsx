import React , {ChangeEvent} from 'react';
import {InitialStateType , sendMessageCreator , updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
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
    updateNewMessageBody: (e: ChangeEvent<HTMLTextAreaElement>) => void
    sendMessage: () => void
}
const mapDispatchDialogsToProps = (dispatch: Dispatch): MapDispatchDialogsType => {
    return {
        updateNewMessageBody: (e: ChangeEvent<HTMLTextAreaElement>) => {
            dispatch ( updateNewMessageBodyCreator ( e.currentTarget.value ) )
        } ,
        sendMessage: () => dispatch ( sendMessageCreator () )
    }
}
export default compose<React.ComponentType> ( connect ( mapStateDialogsToProps , mapDispatchDialogsToProps ) , withAuthRedirect ) ( Dialogs )