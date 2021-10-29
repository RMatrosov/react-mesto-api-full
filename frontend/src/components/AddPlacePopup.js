import PopupWithForm from "./PopupWithForm";
import React, {useEffect, useState} from "react";

export default function AddPlacePopup(props) {

  const [cardTitle, setCardTitle] = useState('');
  const [cardLink, setCardLink] = useState('');

  useEffect(() => {
    setCardTitle('');
    setCardLink('');
  }, [props.isOpen]);


  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      title: cardTitle,
      link: cardLink,
    });
  }

  return (
      <PopupWithForm isOpen={props.isOpen}
                     params={{
                       name: 'new-card',
                       title: 'Новое место',
                       buttonText: 'Создать',
                       buttonLoadingText: 'Создать...',
                       formName: "new-card"
                     }}
                     onClose={props.onClose}
                     onSubmit={handleSubmit}
                     loadingBtn={props.loadingBtn}>


        <input type="text"
               value={cardTitle}
               onChange={(e) => setCardTitle(e.target.value)}
               className="form__input" name="title" id="title" placeholder="Название"
               minLength="2"
               maxLength="200" required/>
        <span className="form__input-error title-input-error"/>
        <input type="url" className="form__input" value={cardLink}
               onChange={(e) => setCardLink(e.target.value)}
               name="link" id="link"
               placeholder="Ссылка на картинку" required/>
        <span className="form__input-error link-input-error"/>


      </PopupWithForm>
  )
}