export default function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_image ${card && 'popup_opened'}`}>
            <div className="popup__container popup__container_type_image">
                <button onClick={onClose} type="button" className="popup__button-close popup__button-close_type_image"/>
                <img src={card?.link} alt={card?.name} className="popup__img"/>
                <h2 className="popup__title">{card?.name}</h2>
            </div>
        </div>
    )
}
