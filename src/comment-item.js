import React from "react";

const CommentItem = (props) => {

  return (
    <li className='comment-item' id={props.id}>
      <p className='comment-item-name'>Имя:</p>
      <p className='indents'> {props.name} </p>
      <p className='comment-item-comment'>Комментарий:</p>
      <p className='indents'> {props.comment} </p>
      <p className='comment-item-date'>Дата:</p>
      <p className='indents'> {props.date} </p>
      <button className='btn-delete' onClick={() => {
        props.deleteComment(props.id)
      }}>
      </button>
    </li>
  )
}

export default CommentItem;