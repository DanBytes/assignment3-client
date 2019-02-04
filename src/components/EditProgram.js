import React, { Component } from 'react'
import { api, setJwt } from '../api/init'
import store from '../config/store'
import { fetchProgram } from '../services/ProgramService'
import { Paper, Button, TextField } from '@material-ui/core'

class EditProgram extends Component {
    state = {
        program:{
            name: '',
            description: '',
            length: '',
            date: ''
        },
        activities:[]
    }

    componentDidMount() {
        api.get(`programs/${this.props.match.params.id}`).then((res)=> {
            this.setState(res.data)
        })  
    }



    handleSubmit = (e) => {
        const token = localStorage.getItem("token")
        setJwt(token)
        e.preventDefault()
        try {
            const { id } = this.props.match.params
            const { name, description, length, date } = e.target.elements
            api.put(`/programs/${id}`, {
                name: name.value,
                description: description.value,
                length: this.state.program.length,
                date: date.value

            })
                .then((response) => {
                    this.props.history.push(`/user`)
                })
        }
        catch (error) { console.error(error) }
    }


    _change = (name, description, length, date) => event => {
        this.setState({program: {
            [name]: event.target.value,
            [description]: event.target.value,
            [length]: event.target.value,
            [date]: event.target.value

        }});
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Edit Program Details</h1>
                    <TextField
                        required
                        id="name"
                        label="Name"
                        margin="normal"
                        type="name"
                        value={ this.state.program.name}
                        onChange={this._change('name')}
                    />
                    <br />
                    <TextField
                        required
                        id="description"
                        label="Description"
                        margin="normal"
                        type="description"
                        value={this.state.program.description}
                        multiline={true}
                        onChange={this._change('description')}
                    />
                    <br />
                    <p>Category</p>
                    <TextField
                        required
                        id="length"
                        label="Length"
                        margin="normal"
                        type="length"
                        value={this.state.program.length}
                        onChange={this._change('length')}
                    />
                    <br />
                    <p>Category</p>
                    <TextField
                        required
                        id="date"
                        label="Date"
                        margin="normal"
                        type="date"
                        value={this.state.program.date}
                        onChange={this._change('date')}
                    />

                    <p>Attachments</p>
                    <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Save Changes</Button>
                </form>
            </div>

        )
    }
}

export default EditProgram