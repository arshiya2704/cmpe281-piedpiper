import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Welcome extends Component {

    static propTypes = {
        username: PropTypes.string.isRequired,
        handleLogout: PropTypes.func.isRequired
    };

    state = {
        username : ''
    };

    handleShareholderNameChange = (idx) => (evt) => {
        const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, email: evt.target.value };
        });

        this.setState({ shareholders: newShareholders });
    }

    handleSubmit = (evt) => {
        const { name, shareholders } = this.state;
        alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
    }

    handleAddShareholder = () => {
        this.setState({ shareholders: this.state.shareholders.concat([{ email: '' }]) });
    }

    handleRemoveShareholder = (idx) => () => {
        this.setState({ shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx) });
    }

    handlesharedDirClick = (dirname) => {
        var arr = this.state.shareddirarr;
        arr.push(dirname.shareddirname);
        API.getFilesFromDir(dirname)
            .then((data) => {;
                this.setState({
                    sharedfiles:data.filelist,
                    shareddirs:data.dirlist,
                    shareddirarr: arr,
                    shareddisable:false
                })
                console.log("dirarray:", this.state.shareddirarr);
                console.log("array:",arr);
            });
    }

    handleOpen1 = (lst) => {
        console.log("lst", lst)
        this.setState({
            open1: true,
            sharename:lst
        });
    };

    handleClose1 = () => {
        this.setState({
            open1: false,
            sharename:''
        });
    };
    componentWillMount(){
        this.setState({
            username : this.props.username
        });
        //document.title = `Welcome, ${this.state.username} !!`;
    }

    componentDidMount(){
        document.title = `Welcome, ${this.state.username} !!`;
    }

    render(){
        return(
            <div className="row justify-content-md-center">
                <div className="col-md-3">
                    <div className="alert alert-warning" role="alert">
                        {this.state.username}, welcome to my App..!!
                    </div>
                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => this.props.handleLogout(this.state)}>
                        Logout
                    </button>
                    <Dialog
                        title="Enter Group Name"
                        actions={actions1}
                        modal={true}
                        open={this.state.open1}
                    >
                        <input
                            type="text"
                            value = {this.state.newgroupname}
                            onChange={(event) => {
                                this.setState({
                                    newgroupname: event.target.value
                                });
                            }}
                        /><br/>
                        <Divider/>
                        {this.state.shareholders.map((shareholder, idx) => (
                            <div className="shareholder">
                                <TextField
                                    type="text"
                                    placeholder={`person #${idx + 1}`}
                                    value={shareholder.email}
                                    onChange={this.handleShareholderNameChange(idx)}
                                />
                                &nbsp;
                                &nbsp;
                                <RaisedButton type="button" onClick={this.handleRemoveShareholder(idx)} className="small">-</RaisedButton>
                            </div>
                        ))}


                        <RaisedButton primary={true} type="button" onClick={this.handleAddShareholder} label="Add more" className="small"/>
                    </Dialog>

                </div>
            </div>
        )
    }
}

export default Welcome;