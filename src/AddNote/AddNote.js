import React, { Component } from 'react';
import ApiContext from '../ApiContext'
import config from '../config';
import PropTypes from 'prop-types';


class AddNote extends Component {
    static contextType = ApiContext
    static defaultProps = {
        addNote: () => { },
      }

      getFolderList = () => {
        if ( typeof this.props !== "object" || this.props.history.location.pathname.includes("/note/") ) return;

        return this.context.folders.map( (folder,i) => {
            return (
                <option
                    key={i}
                    value={folder.id}
                >
                    {folder.name}
                </option>
            );
        });
    }

      getNoteDetails = (form) => {

        const n = new FormData(form)

        let name = n.get("noteName")
        let content = n.get("noteContent")
        let date = new Date().toString()
        let folderId = n.get("folderId")
        console.log(this.getFolderList())
        if (typeof name !== "string" || name.length <= 0) return;
        // const folder = {name:name}
        // console.log(folder)
        this.handleSubmit({name:name, content:content, modified:date, folderId:folderId})
    
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
                <div>
                <form
                className={['Noteful-form', className].join(' ')}
                onSubmit={(e) => {
                    e.preventDefault();
                    this.getNoteDetails(e.target)

                }}
            >
              <select name="folderId" id="folderId">
                {this.getFolderList()}
              </select>
                <input type="text" id="noteName" name="noteName" aria-label="noteName" placeholder="New Note" required />
                <textarea type="text" id="noteContent" name="noteContent" placeholder="Note Content Here" required />
                <button type="submit">Submit</button>
            </form>
            </div>
          );
    }
}
 
AddNote.propTypes = {
  store: PropTypes.object.isRequired
}

export default AddNote;