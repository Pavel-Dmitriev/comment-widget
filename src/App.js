import React from 'react';
import CommentItem from "./comment-item";
import {CommentForm} from "./comment-form";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      text: '',
      comments: []
    };
    this.addComment = this.addComment.bind(this);
    this.onNameChange = this.onNameChange.bind(this)
    this.onCommentChange = this.onCommentChange.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
  }

// перед рендерингом загружаем комментарии из localstorage
  componentWillMount() {
    localStorage.getItem('comments') && this.setState({
      comments: JSON.parse(localStorage.getItem('comments'))
    })
  }

  // удаление комментария
  deleteComment(id) {
    const updateList = this.state.comments.filter(item => item.id !== id);

    localStorage.setItem('comments', JSON.stringify(updateList));
    this.setState({
      comments: updateList
    })
  }

  //генерируем id
  getIdComment() {
    const ms = new Date();
    return ms.getTime();
  }

  //дата и время комментария
  getDateComment() {
    const m = new Date();
    const date = `${m.getDate()}.${m.getMonth() + 1}.${m.getFullYear()}`;
    const time = `${m.getHours()}:${m.getMinutes()}:${m.getSeconds()}`;
    const dateTime = `${date} ${time}`;
    return dateTime;
  }

  //изменение поля name
  onNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  //изменение поля comment
  onCommentChange(event) {
    this.setState({
      comment: event.target.value

    })
  }

  //валидация полей ввода
  validateInput(str) {
    if (str.match(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/ig)) {
      return false;
    } else {
      return true;
    }

  }

  // добавление комментария, событие отправки формы
  addComment(event) {
    event.preventDefault();
    const nameVal = this.state.name.trim().replace(/<[^>]+>/g,'');
    const commentVal = this.state.comment.trim().replace(/<[^>]+>/g,'');

    // проверяем на заполненность полей автор комментарий
    if (nameVal && commentVal) {
      if (this.validateInput(nameVal) && this.validateInput(commentVal)) {
        const currentComments = this.state.comments;
        const newComment = {
          id: this.getIdComment(),
          name: nameVal,
          comment: commentVal,
          date: this.getDateComment()
        }

        currentComments.unshift(newComment)
        localStorage.setItem('comments', JSON.stringify(currentComments));

        this.setState({
          comments: currentComments,
          name: '',
          comment: ''
        })
      } else {
        alert('Поля содержат недопустимые символы');

      }
    } else {
      alert('Поле является обязательным! Вы ввели пустое значение');
    }
  }


  render() {
    const data = this.state.comments;
    let messageTemplate;

    if (data.length) {
      messageTemplate = data.map((item) => {
        return (
          <CommentItem
            id={item.id}
            name={item.name}
            comment={item.comment}
            date={item.date}
            deleteComment={this.deleteComment}
          />
        )
      })
    } else {
      messageTemplate = <p>Комментариев нет</p>
    }

    return (
      <div className='container'>
        <CommentForm
          addComment={this.addComment}
          onNameChange={this.onNameChange}
          onCommentChange={this.onCommentChange}
          comment={this.state.comment}
          name={this.state.name}
        />
        <hr/>
        <h3>Все комментарии:</h3>
        <ol className='comment-item-block'>
          {messageTemplate}
        </ol>
      </div>
    )
  }
}

export default App;
