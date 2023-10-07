import React from "react";
import {Field , InjectedFormProps , reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator , required} from "../../../utils/validators";

const maxLength50 = maxLengthCreator ( 50 )
const AddMessageForm: React.FC<InjectedFormProps<FormDataMessageType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea}
                   validate={[required , maxLength50]}
                   name={'newMessageBody'} placeholder={'Enter message'}/>
        </div>
        <div>
            <button>Send</button>
        </div>
    </form>
}

export default reduxForm<FormDataMessageType> ( { form: 'dialogAddMessageForm' } ) ( AddMessageForm )
//type
export type FormDataMessageType = {
    newMessageBody: string
}