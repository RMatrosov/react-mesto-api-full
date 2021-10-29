import {useState} from "react";


const Login = ({handleAuthorize}) => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault()
    handleAuthorize(email, password)
  }


  return (
        <form onSubmit={handleSubmit} className='log__in_wrapper'>
          <h4 className='log__in_title'>Вход</h4>
          <input type="email" className="log__in_input"
                 name='email' placeholder='Email'
                 onChange={(e) => setEmail(e.target.value)}
                 minLength="2" value={email || ''}
                 maxLength="40" required/>

          <input type="password" className="log__in_input"
                 name='password' placeholder='Пароль'
                 minLength="2" value={password || ''}
                 onChange={(e) => setPassword(e.target.value)}
                 maxLength="200" required/>

          <button type='submit' className='log__in_button'>Войти</button>
        </form>
  )
}

export default Login