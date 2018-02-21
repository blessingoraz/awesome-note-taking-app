import React, { Component } from 'react';
import axios from 'axios';
import Alert from './alert';

class Note extends Component {
  state = {
    note: {},
    allNotes: null,
    showContainer: {},
    showAlert: false,
    errorMessage: null
  };

  componentDidMount() {
    if (this.props.userId) {
      this.getAllNotes(this.props.userId);
    }
  }

  getAllNotes(id) {
    axios.get(`https://gentle-castle-94319.herokuapp.com/user/${id}/notes`)
      .then((response) => {
        this.setState({ allNotes: response.data })
      })
      .catch((error) => {
        this.setState(error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { note } = this.state;
    const { userId } = this.props;
    if (!note) {
      this.setState({ errorMessage: "Unable to create a note", showAlert: true });
      return;
    }
    axios.post(`https://gentle-castle-94319.herokuapp.com/user/${userId}/note`, {
      note,
    })
      .then((response) => {
        this.setState({ showAlert: false });
        this.getAllNotes(userId);
      })
      .catch((error) => {
        this.setState({ errorMessage: "Unable to create a note", showAlert: true });
      });
  }

  handleDelete = (id) => {
    const { userId } = this.props;
    const { allNotes } = this.state;
    axios.delete(`https://gentle-castle-94319.herokuapp.com/user/${userId}/notes/${id}`)
      .then((response) => {
        allNotes.splice(id, 1);
        this.setState({ allNotes })
      })
      .catch((error) => {
      });
  }

  handleupdate = (e, id, index) => {
    e.preventDefault();
    const { note } = this.state;
    const { userId } = this.props;
    axios.put(`https://gentle-castle-94319.herokuapp.com/user/${userId}/notes/${id}`, {
      note: note[index],
    })
      .then((response) => {
        this.getAllNotes(userId);
        this.toggleShowUpdateInput(index);
      })
      .catch((error) => {
        this.setState(error);
      });
  }

  handleOnChange = (target) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }
  handleNoteUpdate = (target, index) => {
    const { value } = target;
    this.setState({
      note: {
        ...this.state.note,
        [index]: value
      }
    })
  }

  toggleShowUpdateInput = (index) => {
      this.setState({ showContainer: {
        ...this.state.showContainer,
        [index]: !this.state.showContainer[index]
      }
    });
  }
  showUpdateContainer = (note, index) => {
    if (this.state.showContainer[index]) {
      return (
        <div>
          <form onSubmit={(e) => this.handleupdate(e, note._id, index)}>
            <input type="text" value={this.state.note[index]} name="note" onChange={(e) => this.handleNoteUpdate(e.target, index)} />
            <input type="submit" value="update" />
          </form>
        </div>
      )
    }
    return (
      <div>
        <input
          type="button"
          value="click to update"
          onClick={() => this.toggleShowUpdateInput(index)} />
      </div>
    )
  }

  showNotes = () => {
    const notes = this.state.allNotes;
    if (notes !== null) {
      return (
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th className="tableHeader">NOTES</th>
                <th className="tableHeader" >DELETE</th>
                <th className="tableHeader">UPDATE</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note, index) => {
                return (
                  <tr
                    key={index}>
                    <td>
                      <div>
                        <p>{note.note}</p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <input type="button" value="delete" onClick={() => this.handleDelete(note._id)} />
                      </div>
                    </td>
                    <td>
                      {this.showUpdateContainer(note, index)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    }
    return null;
  }

  render() {
    return (
      <div className="Note-container">
        <h2 className="App-title">Simple Note App</h2>

        {this.state.showAlert && <Alert message={this.state.errorMessage} handleCancelAlert={this.props.handleCancelAlert} />}

        <div className="Note-input-container">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="note"
              placeholder="Create notes here"
              className="Note-input"
              onChange={(e) => this.handleOnChange(e.target)} />
            <input
              type="submit"
              value="create"
              className="Note-button" />
          </form>
        </div>

        {this.showNotes()}

      </div>
    )
  }
}

export default Note;
