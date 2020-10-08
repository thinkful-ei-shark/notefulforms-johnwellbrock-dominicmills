import React, { Component } from 'react';
import ApiContext from '../ApiContext'
import config from '../config';


class NotefulNoteAdd extends Component {
    static contextType = ApiContext
    static defaultProps = {
        addNote: () => { },
      }

      getNoteDetails = (form) => {
        const n = new FormData(form)
        let name = n.get("noteName")
        let content = n.get("noteContent")
        if (typeof name !== "string" || name.length <= 0) return;
        // const folder = {name:name}
        // console.log(folder)
        this.handleSubmit({name:name}, {content:content})
    
      }
      handleSubmit = (data) => {
        fetch(`${config.API_ENDPOINT}/notes/`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(res => {
            this.props.addNote(data)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error({ error })
      })
    }
    render() { 
        const { className } = this.context
        return (
                <form
                className={['Noteful-form', className].join(' ')}
                onSubmit={(e) => {
                    // e.preventDefault();
                    this.getNoteDetails(e.target)

                }}
            >
                <input type="text" id="noteName" name="noteName" aria-label="noteName" placeholder="New Note" required />
                <textarea type="text" id="noteContent" name="noteContent" placeholder="Note Content Here" required />
                <button type="submit">Submit</button>
            </form>
          );
    }
}
 
export default NotefulNoteAdd;