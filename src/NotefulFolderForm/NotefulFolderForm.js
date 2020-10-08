import React, { Component } from 'react';
import './NotefulFolderForm.css'
import ApiContext from '../ApiContext'
import CircleButton from '../CircleButton/CircleButton'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import config from '../config';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
//import { Route } from 'react-router-dom';

class NotefuFolderForm extends Component {
  static contextType = ApiContext
  static defaultProps = {
    addFolder: () => { },
  }

  getFolderName = (form) => {
    const fold = new FormData(form)
    let name = fold.get("newFolderName") 
    if (typeof name !== "string" || name.length <= 0) return;
    // const folder = {name:name}
    // console.log(folder)
    this.handleSubmit({name:name})

  }
  handleSubmit = (data) => {
    fetch(`${config.API_ENDPOINT}/folders/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      // .then(res => {
      //   if (!res.ok)
      //     return res.json().then(e => Promise.reject(e))
      //   return res.json()
      // })
      .then(res => {
        //this.context.addFolder(data)
        // allow parent to perform extra behaviour
        this.props.addFolder(data)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error({ error })
      })
    }
 /* -----------------------------
    handleClickDelete = e => {
      e.preventDefault()
      const noteId = this.props.id
  
      fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      })
        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
        .then(() => {
          this.context.deleteNote(noteId)
          // allow parent to perform extra behaviour
          this.props.onDeleteNote(noteId)
        })
        .catch(error => {
          console.error({ error })
        })
    }
  -------*/

  render() {
    const { className } = this.context
    return (
      <main>
        <form
          className={['Noteful-form', className].join(' ')}
          onSubmit={(e) => {
              e.preventDefault();
              this.getFolderName(e.target)}}
        >
          <input type="text" id="newFolderName" name="newFolderName" aria-label="newFolderName" placeholder="New Folder" required />
            <button type="submit">Submit</button>
          
        </form>
      </main>
    )
  }
}

export default NotefuFolderForm;
