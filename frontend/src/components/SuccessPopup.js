import SuccessOrFailPopup from "./SuccessOrFailPopup";


const SuccessPopup = ({onClose, isOpen}) => {

  const text = 'Вы успешно зарегистрировались!'
  const className = 'success__popup_img'

  return (
      <SuccessOrFailPopup onClose={onClose} isOpen={isOpen} text={text} className={className}/>
  )
}

export default SuccessPopup