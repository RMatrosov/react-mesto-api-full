import {Link, Route, Switch} from "react-router-dom";


export default function Header({signOut, currentEmail}) {


  return (
      <header className="header">
        <a href="#" target="_blank" className="logo"/>
        <div className='header__wrapper'>
          {currentEmail && <p className='header__wrapper_email'>{currentEmail}</p>}
          <Switch>
            <Route exact path='/'>
              <button onClick={signOut}
                      className='header__wrapper_button'>Выйти</button>
            </Route>
            <Route exact path='/sign-up'>
              <Link to='/sign-in'>
                <button className='header__wrapper_button'>Войти</button>
              </Link>
            </Route>
            <Route exact path='/sign-in'>
              <Link to='/sign-up'>
                <button className='header__wrapper_button'>Регистрация</button>
              </Link>
            </Route>
          </Switch>
        </div>
      </header>
  )
}

