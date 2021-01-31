import React from "react";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="comment-form" onSubmit={
        (e) => {
          this.props.addComment(e);
        }
      }>
        <h1>Оставьте комментарий:</h1>
        <input
          className="user-name"
          type="text"
          placeholder="Введите имя"
          value={this.props.name}
          onChange={(event) => {
            this.props.onNameChange(event)
          }}
        />
        <textarea
          className="comment-field"
          name="text"
          placeholder="Введите комментарий"
          value={this.props.comment}
          onChange={(event) => {
            this.props.onCommentChange(event)
          }}
        >
          </textarea>
        <button className="btn-add-comment">Добавить</button>
      </form>
    )
  }

}

export default CommentForm;