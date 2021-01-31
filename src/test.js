import React from 'react'
import {format} from 'date-fns'

// import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      form: {
        name: '',
        comment: ''
      }
    }
  }

  componentDidMount() {
    if (localStorage.getItem('state')) {
      this.setState({...JSON.parse(localStorage.getItem('state'))})
    }
  }

  addComment = () => {
    // this.state.form.name = this.state.form.name.replace(/<[^>]+>/g,'');
    // this.state.form.comment = this.state.form.comment.replace(/<[^>]+>/g,'');
    if (this.state.form.name.length === 0 || this.state.form.comment.length === 0) {
      alert('input error')
    } else {
      this.setState({
        comments: [
          ...this.state.comments,
          {
            id: this.state.comments.length ? this.state.comments.reduce((p, c) => p.id > c.id ? p : c).id + 1 : 1, // max id +1
            name: this.state.form.name,
            comment: this.state.form.comment,
            date: new Date()
          }
        ],
        form: {
          name: '',
          comment: ''
        }
      }, () => localStorage.setItem('state', JSON.stringify(this.state)))
    }

  }


  removeComment = (id) => {
    this.setState({
      comments: this.state.comments.filter(comment => comment.id !== id)
    }, () => localStorage.setItem('state', JSON.stringify(this.state)))
  }

  handleChange = (e) => {
    console.log(e.target.name)
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    })
  }

  render() {
    return (
      <div className="App">

        <div style={{marginBottom: "20px"}}>
          <label>Имя: <input

            type="text"
            value={this.state.form.name}
            name="name"
            onChange={this.handleChange}/></label><br/>
          <label>Коментарий:<br/> <textarea
            name="comment"
            value={this.state.form.comment}
            onChange={this.handleChange}></textarea>
          </label><br/>
          <button onClick={this.addComment}>Добавить комментарий</button>
        </div>
        {this.state.comments.map(comment => <div key={comment.id}>
          <span style={{
            fontStyle: 'italic',
            paddingRight: '10px',
            paddingDown: '10px'
          }}>{comment.id} - {format(comment.date, 'dd/mm/yyyy')}: </span>
          <strong>{comment.name}, </strong>
          <span style={{paddingRight: '20px'}}>{comment.comment}</span>
          <button onClick={this.removeComment.bind(null, comment.id)}>Удалить</button>
        </div>)}
        <br/>
      </div>
    )
  }
}

export default App