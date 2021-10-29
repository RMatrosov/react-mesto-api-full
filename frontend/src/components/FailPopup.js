import SuccessOrFailPopup from "./SuccessOrFailPopup";


const FailPopup = ({onClose, isOpen}) =>{
  const text = 'Что-то пошло не так! Попробуйте ещё раз'
  const className = 'fail__popup_img'

  return(
      <SuccessOrFailPopup onClose={onClose} isOpen={isOpen} text={text} className={className}/>
  )
}

export default FailPopup