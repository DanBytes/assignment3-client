import React, { Component } from 'react'
import { api, setJwt } from '../api/init'
import store from '../config/store'
import { fetchProgram } from '../services/ProgramService'
import { Button, TextField } from '@material-ui/core'

class EditProgram extends Component {
    state = {
        program: {
            name: '',
            description: '',
            length: '',
            date: ''
        },
        activities: []
    }

    componentDidMount() {
        api.get(`programs/${this.props.match.params.id}`).then((res) => {
            this.setState(res.data)
        })
    }



    handleSubmit = (e) => {
        const token = localStorage.getItem("token")
        setJwt(token)
        e.preventDefault()
        try {
            const { id } = this.props.match.params
            const { name, description, len, date } = e.target.elements
            api.put(`/programs/${id}`, {
                name: name.value,
                description: description.value,
                length: len.value,
                date: date.value

            })
                .then((response) => {
                    this.props.history.push(`/user`)
                })
        }
        catch (error) { console.error(error) }
    }


    _change = (name, description, len, date) => event => {
        this.setState({
            program: {
                [name]: event.target.value,
                [description]: event.target.value,
                [len]: event.target.value,
                [date]: event.target.value

            }
        });
    };

    render() {
        return (
            <div>
                {/* Instructive form heading */}
                <h1>Edit Program</h1>
                <form onSubmit={this.handleSubmit}>

                    {/* Update your program title */}
                    <TextField
                        required
                        id="name"
                        label="Title"
                        style={{ margin: 15 }}
                        placeholder="My Awesome Program"
                        // helperText="Update your program title"
                        margin="normal"
                        type="name"
                        value={this.state.program.name}
                        onChange={this._change('name')}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }} // When you begin typing, this makes sure the Labels don't cover up the other fields' input boxes and overlap with the prefilled text. 
                    />
                    <br />

                    {/* Update your description of the program */}
                    <TextField
                        required
                        id="description"
                        label="Description"
                        style={{ margin: 15 }}
                        placeholder="Give details about this program, e.g. its purpose, theme, requirements etc."
                        // helperText="Update your program description"
                        value={this.state.program.description}
                        multiline
                        rowsMax="20"
                        onChange={this._change('description')}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br />

                    {/* Update the date when your program will be run */}
                    <TextField
                        required
                        id="date"
                        label="Date"
                        style={{ margin: 15 }}
                        helperText="When will you run your program?"
                        margin="normal"
                        variant="outlined"
                        type="date"
                        value={this.state.program.date}
                        onChange={this._change('date')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br />

                    {/* Update how many minutes your program will be run for */}
                    <TextField
                        required
                        id="len"
                        label="Length"
                        style={{ margin: 15 }}
                        placeholder="Enter number between 1 - 120"
                        helperText="How many minutes will your program run for?"
                        margin="normal"
                        type="length"
                        value={this.state.program.length}
                        onChange={this._change('len')}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br />

                    {/* Update attached files - add new file or remove existing file */}
                    {/* <p>Attachments</p> */}

                    {/* Click 'save changes' to update your program with the new details */}
                    <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange', margin: 15 }}>Save Changes</Button>

                </form>
            </div>

        )
    }
}

export default EditProgram