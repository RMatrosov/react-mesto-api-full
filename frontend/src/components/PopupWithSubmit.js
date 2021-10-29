import PopupWithForm from "./PopupWithForm";


export default function PopupWithSubmit(props) {

function handleSubmit(e) {
  e.preventDefault()
  props.onSubmit(props.cardToDelete)
}

  return (
      <PopupWithForm isOpen={props.isOpen}
                     params={{
                       name: 'type_confirmation',
                       title: 'Вы уверены?',
                       buttonText: 'Да',
                       buttonLoadingText: '...',
                       formName: "type_confirmation"
                     }}
                     onClose={props.onClose}
                     loadingBtn={props.loadingBtn}
                     onSubmit={handleSubmit}>

      </PopupWithForm>
  )
}