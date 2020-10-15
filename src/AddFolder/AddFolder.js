import React, { Component } from 'react';
import './AddFolder.css'
import ApiContext from '../ApiContext'
import config from '../config';
import PropTypes from 'prop-types';


class AddFolder extends Component {
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


  render() {
    const { className } = this.context
    return (
      
      <div>

          <form
            className={['Noteful-form', className].join(' ')}
            onSubmit={(e) => {
              e.preventDefault();
              this.getFolderName(e.target)}}
        >
          <input type="text" id="newFolderName" name="newFolderName" aria-label="newFolderName" placeholder="New Folder" required />
            <button type="submit">Submit</button>
          
        </form>

      </div>
    )
  }
}

AddFolder.propTypes = {
  store: PropTypes.object.isRequired
}

export default AddFolder;
