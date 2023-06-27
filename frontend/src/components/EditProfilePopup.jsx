import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ onClose, isOpen, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleJobChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        type="text"
        minLength="2"
        maxLength="40"
        required
        name="input_type_name"
        id="name"
        className="pop-up__input pop-up__input_type_name"
        placeholder="Имя"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span id="name-error" className="pop-up__error"></span>
      <input
        id="job"
        type="text"
        minLength="2"
        maxLength="200"
        required
        name="input_type_job"
        className="pop-up__input pop-up__input_type_job"
        placeholder="О себе"
        value={description || ""}
        onChange={handleJobChange}
      />
      <span id="job-error" className="pop-up__error"></span>
    </PopupWithForm>
  );
}
