import {useState} from "react";
import {Link} from "react-router-dom";


const Register = ({handleRegister}) => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(email, password)
  }

  return (
        <form onSubmit={handleSubmit} className='log__in_wrapper'>
          <h4 className='log__in_title'>Регистрация</h4>
          <input type="email" className="log__in_input"
                 name='name' placeholder='Email'
                 minLength="2" value={email || ''}
                 onChange={(e) => setEmail(e.target.value)}
                 maxLength="40" required/>

          <input type="password" className="log__in_input"
                 name='password' placeholder='Пароль'
                 minLength="2" value={password || ''}
                 onChange={(e) => setPassword(e.target.value)}
                 maxLength="200" required/>

          <button type='submit' className='log__in_button'>Зарегистрироваться</button>
          <p className='login__form_button-text'>Уже зарегистрированы?
            <Link to='/sign-in'>
              <button className='login__form_button'> Войти</button>
            </Link>
          </p>
        </form>
  )
}

export default Register