import PopupWithForm from "./PopupWithForm";
import React, {useEffect} from "react";

export default function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  useEffect(() => {
    avatarRef.current.value = ''
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
      <PopupWithForm isOpen={props.isOpen}
                     onClose={props.onClose}
                     loadingBtn={props.loadingBtn}
                     onSubmit={handleSubmit}
                     params={{
                       name: 'type_avatar',
                       title: 'Обновить аватар',
                       buttonText: 'Сохранить',
                       buttonLoadingText: 'Сохранить...',
                       formName: "change-avatar"
                     }}>

        <input ref={avatarRef} type="url" className="form__input" name="link" id="avatar"
               placeholder="Ссылка на картинку" required/>
        <span className="form__input-error avatar-input-error"/>

      </PopupWithForm>
  )
}