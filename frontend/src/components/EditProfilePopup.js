import React, {useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
      <PopupWithForm isOpen={props.isOpen}
                     params={{
                       name: 'type_edit',
                       title: 'Редактировать профиль',
                       buttonText: 'Сохранить',
                       buttonLoadingText: 'Сохранить...',
                       formName: "edit-profile"
                     }}
                     onClose={props.onClose}
                     loadingBtn={props.loadingBtn}
                     onSubmit={handleSubmit}>

        <input type="text" className="form__input"
               onChange={(e)=>setName(e.target.value)}
               name='name' id='name' placeholder='Введите имя'
               minLength="2" value={name || ''}
               maxLength="40" required/>
        <span className="form__input-error name-input-error"/>
        <input type="text" className="form__input"
               onChange={(e)=>setDescription(e.target.value)}
               name='description' id='description' placeholder='Введите род занятия'
               minLength="2" value={description || ''}
               maxLength="200" required/>
        <span className="form__input-error job-input-error"/>
      </PopupWithForm>
  )
}