import React, { Component } from 'react'
import axios from 'axios';
import '../styles/Note.css';

class Note extends Component {
    state = {
        note: null,
        allNotes: null,
        showContainer: null
    };

    getAllNotes(id) {
        axios.get(`https://gentle-castle-94319.herokuapp.com/user/${id}/notes`)
            .then((response) => {
                this.setState({ allNotes: response.data, note: '' })
            })
            .catch((error) => {
                this.setState(error);
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { note } = this.state;
        const { userId } = this.props;
        axios.post(`https://gentle-castle-94319.herokuapp.com/user/${userId}/note`, {
            note,
        })
            .then((response) => {
                this.getAllNotes(userId);
            })
            .catch((error) => {
                this.setState(error);
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

    handleupdate = (id) => {
        const { note } = this.state;
        const { userId } = this.props;
        axios.put(`https://gentle-castle-94319.herokuapp.com/user/${userId}/notes/${id}`, {
            note,
        })
            .then((response) => {
                this.handleShowUpdateInput();
            })
            .catch((error) => {
                this.setState(error);
            });
    }

    handleOnChange = (target) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    }

    handleShowUpdateInput = () => {
        this.setState({ showContainer: !this.state.showContainer });

    }
    showUpdateContainer = (note) => {
        if (!this.state.showContainer) {
            return (
                <div>
                    <input
                        type="button"
                        value="click to update"
                        onClick={this.handleShowUpdateInput} />
                </div>
            )
        }
        return (
            <div>
                <input type="text" name="note" onChange={(e) => this.handleOnChange(e.target)} />
                <input type="button" value="update" onClick={() => this.handleupdate(note._id)} />
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
                            {notes.map((note, id) => {
                                return (
                                    <tr
                                        key={id}>
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

                                            {this.showUpdateContainer(note)}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )
            // return notes.map((note, id) => {
            //     return (
            //         <div key={id}>
            //             {note.note}

            //             <input type="button" value="delete" onClick={() => this.handleDelete(note._id)} />

            //             <input type="text" name="note" onChange={(e) => this.handleOnChange(e.target)} />
            //             <input type="button" value="update" onClick={() => this.handleupdate(note._id)} />
            //         </div>
            //     )
            // })
        }
        return null;
    }

    render() {
        return (
            <div className="Note-container">
                <h2 className="App-title">Simple Note App</h2>
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
