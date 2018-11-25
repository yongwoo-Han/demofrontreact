import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'; //withRouter 하위 컴포넌트에서 history 접근할 수 없어서 사용
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class GroupEdit extends Component {
    emptyItem = {
        name : "",
        email : "",
        city : "",
        stateOrProvince : "",
        postalCode : ""
    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if(this.props.match.params.id !== 'new') {
            const group = await (await fetch(`/api/group/${this.props.match.params.id}`)).json();
            this.setState({item:group});
        }
    }
    
    /**
     * auto Complate
     * @param {} event 
     */
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    /**
     * 폼 작성 후 Submit
     * @param {event} event 
     */
    async handleSubmit(event) {
        event.preventDefault();
        const{item} = this.state;

        await fetch(`/api/group/${item.id}`, {
           method: (item.id) ? 'PUT' : 'POST',
           headers: {
               'Accept': 'application/json'
               ,'Content-Type': 'application/json'
           },
           body:JSON.stringify(item)
        })
        // .then((result) => {
        //     // let, const는 hoisting 되는 것을 방지하고자 사용
        //     let updatedGroups = [item.groups];
        //     this.setState({groups:updatedGroups});
        // });
        this.props.history.push('/groups'); //리다이렉트 하기위해 (/api/groups)
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Group' : 'Add Group'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name||''}
                        onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input type="text" name="city" id="city" value={item.city||''}
                        onChange={this.handleChange} autoComplete="address-level1"/>
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                        <Label for="stateOrProvince">State/Province</Label>
                        <Input type="text" name="stateOrProvince" id="stateOrProvince" value={item.stateOrProvince || ''}
                                onChange={this.handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                        <Label for="country">Country</Label>
                        <Input type="text" name="country" id="country" value={item.country || ''}
                                onChange={this.handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                        <Label for="country">Postal Code</Label>
                        <Input type="text" name="postalCode" id="postalCode" value={item.postalCode || ''}
                                onChange={this.handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/groups">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(GroupEdit);