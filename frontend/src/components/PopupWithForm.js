export default function PopupWithForm(props) {
    return (
            <div className={`popup popup_${props.params.name} ${props.isOpen && 'popup_opened'}`}>
                <div className="popup__container">
                    <button onClick={props.onClose} type="button" className="popup__button-close"/>
                    <form onSubmit={props.onSubmit} action="#" className="form" name={props.params.formName}>
                        <h2 className="form__heading">{props.params.title}</h2>
                        {props.children}
                        <button type="submit" className="form__button">{props.loadingBtn? props.params.buttonLoadingText : props.params.buttonText}</button>
                    </form>
                </div>
            </div>
    )
}
