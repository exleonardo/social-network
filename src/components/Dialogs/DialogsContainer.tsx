import {ChangeEvent} from 'react';
import {InitialStateType , sendMessageCreator , updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";

export type DialogsPropsType = MapStateDialogsType & MapDispatchDialogsType
export type MapStateDialogsType = {
    dialogsPage: InitialStateType;
    isAuth: boolean
}
const mapStateDialogsToProps = (state: AppStateType): MapStateDialogsType => {
    return {
        dialogsPage: state.dialogsPage ,
        isAuth: state.auth.isAuth
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
const DialogsContainer = connect ( mapStateDialogsToProps , mapDispatchDialogsToProps ) ( Dialogs )
export default DialogsContainer;