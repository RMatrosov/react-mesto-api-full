import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = (
      `element__button-delete ${!isOwn ? 'card__delete-button_hidden' : ''}`
  );

  const isLiked = card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
      onCardDelete(card)
  }

  return (
      <li className="element">
        <button type="button" className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}/>
        <img src={card.link} alt={card.name} onClick={() => onCardClick(card)}
             className="element__image"/>
        <div className="element__group">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like-group">
            <button type="button" className={cardLikeButtonClassName}
                    onClick={handleLikeClick}/>
            <span className="element__like-counter">{card.likes.length}</span>
          </div>
        </div>
      </li>
  )
}
