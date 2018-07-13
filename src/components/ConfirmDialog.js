import React from 'react';
import Button from './Button';
import '../style/ConfirmDialog.css';

export default (props) => <div className={"confirmDialogWrapper"}>
    <div className={"confirmDialog"}>
        <h3>{props.question}</h3>
        <div className={"confirmDialogButtons"}>
            <Button
                onClick={props.onCancel}
                text={props.cancelText ? props.cancelText : "Cancel"}
            />
            <Button
                onClick={props.onConfirm}
                text={props.confirmText ? props.confirmText : "OK"}
            />
        </div>
    </div>
</div>