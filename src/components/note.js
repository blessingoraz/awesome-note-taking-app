import React, { Component } from 'react'
import axios from 'axios';

class Note extends Component {
    state = {
        note: null,
        allNotes: null
    };

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
                this.setState({allNotes})
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
            })
            .catch((error) => {
                this.setState(error);
            });
    }

    handleOnChange = (target) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    }

    showNotes = () => {
        const notes = this.state.allNotes;
        if (notes !== null) {
            return notes.map((note, id) => {
                return (
                    <div key={id}>
                        {note.note}

                        <input type="button" value="delete" onClick={() => this.handleDelete(note._id)} />
                        
                        <input type="text" name="note" onChange={(e) => this.handleOnChange(e.target)} />
                        <input type="button" value="update" onClick={() => this.handleupdate(note._id)} />
                    </div>
                )
            })
        }
        return null;
    }

    render() {
        return (
            <div>
                <h2>Notes here </h2>
                <form onSubmit={this.handleSubmit}>
                    Notes: <input type="text" name="note" onChange={(e) => this.handleOnChange(e.target)} />
                    <input type="submit" value="create" />
                </form>
                {this.showNotes()}
            </div>
        )
    }
}

export default Note;
