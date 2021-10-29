import Main from "./Main";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithSubmit from "./PopupWithSubmit";
import ProtectedRoute from "./ProtectedRoute";
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import * as auth from "../utils/auth";
import SuccessPopup from "./SuccessPopup";
import FailPopup from "./FailPopup";
import Header from "./Header";

function App() {

  const [selectedCard, setSelectedCard] = useState(null)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupWithSubmitOpen, setPopupWithSubmitOpen] = useState(false);
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [failPopupOpen, setFailPopupOpen] = useState(false);

  const history = useHistory()

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setCurrentEmail(res.data.email)
          setLoggedIn(true)
          history.push('/')
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }, [history])

  useEffect(() => {
    setIsLoading(true)
    if (loggedIn) {
      const jwt = localStorage.getItem('jwt');
      Promise.all([api.getInitialCards(jwt), api.getUserInfoFromServer(jwt)])
          .then(([cardData, userData]) => {
            setCards(cardData.data.reverse())
            setCurrentUser(userData.data)
          }).catch((error) => {
        console.log(error)
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const jwt = localStorage.getItem('jwt');
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked, jwt).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
    }).catch((err) => {
      console.log(err);
    })
  }

  function handleCardDelete(card) {
    setPopupWithSubmitOpen(true);
    setCardToDelete(card)
  }

  function handleCardDeleteSubmit(card) {
    setLoadingBtn(true)
    const jwt = localStorage.getItem('jwt');
    api.deleteCardFromServer(card._id, jwt).then((data) => {
      if (data) {
        setCards((state) => state.filter(item => item !== card));
        setPopupWithSubmitOpen(false);
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingBtn(false)
    })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setPopupWithSubmitOpen(false)
    setSelectedCard(null)
    setSuccessPopupOpen(false)
    setFailPopupOpen(false)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser({name, about}) {
    setLoadingBtn(true)
    const jwt = localStorage.getItem('jwt');
    api.setUserInfoFromServer(name, about, jwt).then(data => {
      setCurrentUser(data.data);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
      setLoadingBtn(false)
    })
  }

  function handleUpdateAvatar(link) {
    setLoadingBtn(true)
    const jwt = localStorage.getItem('jwt');
    api.changeAvatar(link, jwt).then(data => {
      setCurrentUser(data.data);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
      setLoadingBtn(false)
    })
  }

  function handleAddPlaceSubmit({title, link}) {
    setLoadingBtn(true)
    const jwt = localStorage.getItem('jwt');
    api.addCardToServer(title, link, jwt).then(data => {
      setCards([data.data, ...cards]);
      closeAllPopups();
      setLoadingBtn(false)
    }).catch((err) => {
      setLoadingBtn(false)
    })
  }

  function handleAuthorize(email, password) {
    auth.authorize(email, password).then((data) => {
      if (data.token) {
        setLoggedIn(true)
        setCurrentEmail(email)
        history.push('/')
      }
    }).catch((err) => {
      setFailPopupOpen(true)
      console.log(err)
    });
  }

  function handleRegister(email, password) {
    auth.register(email, password).then((response) => {
      setSuccessPopupOpen(true)
      history.push('/sign-in')
    }).catch((err) => {
      console.log(err)
      setFailPopupOpen(true)

    })
  }

  function signOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setLoggedIn(false)
    setCurrentEmail('')

  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="App">
          <div className="page">
            <div className="page__wrapper">
              <SuccessPopup onClose={closeAllPopups}
                            isOpen={successPopupOpen}
              />
              <FailPopup onClose={closeAllPopups}
                         isOpen={failPopupOpen}
              />
              <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
              <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                onUpdateUser={handleUpdateUser}
                                onClose={closeAllPopups}
                                loadingBtn={loadingBtn}/>
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                               onUpdateAvatar={handleUpdateAvatar}
                               onClose={closeAllPopups}
                               loadingBtn={loadingBtn}/>

              <AddPlacePopup onClose={closeAllPopups}
                             isOpen={isAddPlacePopupOpen}
                             onAddPlace={handleAddPlaceSubmit}
                             loadingBtn={loadingBtn}/>
              <PopupWithSubmit onClose={closeAllPopups}
                               isOpen={isPopupWithSubmitOpen}
                               onSubmit={handleCardDeleteSubmit}
                               cardToDelete={cardToDelete}
                               loadingBtn={loadingBtn}/>
              <Header currentEmail={currentEmail}
                      signOut={signOut}/>
              <Switch>
                <ProtectedRoute exact path="/" loggedIn={loggedIn}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                isLoading={isLoading}
                                component={Main}/>

                <Route path="/sign-in">
                  <Login handleAuthorize={handleAuthorize}/>
                </Route>
                <Route path="/sign-up">
                  <Register handleRegister={handleRegister}/>
                </Route>
                <Route path="/">
                  {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
                </Route>
              </Switch>
              <Footer/>
            </div>
          </div>
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
