import Card from "./Card";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {Spinner} from "./Spinner";




export default function Main({
                               onCardClick, onAddPlace, onEditProfile, onEditAvatar, cards,
                               onCardLike, onCardDelete, isLoading
                             }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
        <main className="main">
          {isLoading ? (<Spinner/>) :
              (<>
                <section className="profile">
                  <div className="profile__wrapper">
                    <div className="profile__image-wrapper">
                      <img onClick={onEditAvatar} src={currentUser.avatar} alt="фото профиля"
                           className="profile__image"/>
                      <button  className="profile__image-btn"/>
                    </div>
                    <div className="profile__info">
                      <h1 className="profile__name">{currentUser.name}</h1>
                      <button onClick={onEditProfile} type="button" className="profile__button"/>
                      <p className="profile__job">{currentUser.about}</p>
                    </div>
                  </div>
                  <button onClick={onAddPlace} type="button" className="profile__button-add"/>
                </section>

                <section className="elements">
                  <ul className="elements__list">
                    {cards && cards.map((card) => <Card
                        key={card._id} card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />)}
                  </ul>
                </section>
              </>)}
        </main>
  )
}
