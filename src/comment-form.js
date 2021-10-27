import React from 'react'

export const CommentForm = (props) => {
  return (
    <form
      className="comment-form"
      onSubmit={(e) => props.addComment(e)}
    >
      <h1>Оставьте комментарий:</h1>
      <input
        className="user-name"
        type="text"
        name="name"
        placeholder="Введите имя"
        value={props.name}
        onChange={(e) => props.onNameChange(e)}
      />
      <textarea
        className="comment-field"
        type="text"
        name="comment"
        placeholder="Введите комментарий"
        value={props.comment}
        onChange={(e) => props.onCommentChange(e)}
      />
      <button className="btn-add-comment">Добавить</button>
    </form>
  )
}