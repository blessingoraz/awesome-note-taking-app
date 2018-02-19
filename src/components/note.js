import React, { Component } from 'react'
import axios from 'axios';

class Note extends Component {
    state = {
        note: null
    };

    componentDidMount() {
        console.log('got here ooooo', this.props)
        // const { id } = this.props;
        // axios.get(`https://gentle-castle-94319.herokuapp.com/user/${id}/notes`)
        //     .then((response) => {
        //         console.log('response of notes =========', response)
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         this.setState(error);
        //     });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { note } = this.state;
        const { id } = this.props;
        axios.post(`https://gentle-castle-94319.herokuapp.com/user/${id}/note`, {
            note,
        })
            .then((response) => {
                console.log('response ===', response)
            })
            .catch((error) => {
                console.log(error);
                this.setState(error);
            });
    }

    handleOnChange = (target) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    }

    render() {
        console.log('id is here ', this.props)
        return (
            <div>
                <h2>Notes here </h2>
                <form onSubmit={this.handleSubmit}>
                    Notes: <input type="text" name="note" onChange={(e) => this.handleOnChange(e.target)} />
                    <input type="submit" value="create" />
                    <input type="button" value="delete" />
                    <input type="button" value="update" />
                </form>
            </div>
        )
    }
}

export default Note;
