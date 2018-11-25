import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link} from 'react-router-dom'; //브라우저에서사용되는 리액트 라우터

class GroupList extends Component {
    
    /**
     * 생성자 - 최초 실행
     */
    constructor(props) {
        super(props);
        this.state = {groups:[], isLoading:true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading:true});

        fetch('/api/groups')
            .then(response => response.json())
            .then(data => this.setState({groups:data, isLoading:false}));
    }

    /**
     * 생성자에서 바인딩 한 삭제 메서드
     * 해당 ID를 삭제한 후 그룹 다시 세팅(Re Landering)
     * @param {삭제하고자 하는 ID} id 
     */
    async remove(id) {
        await fetch(`/api/group/${id}`, {
            method : 'DELETE'
            ,headers: {
                'Accept' : 'application/json'
                ,'Content-Type' : 'application/json'
            }
        }).then(() => {
            // let, const는 hoisting 되는 것을 방지하고자 사용
            let updatedGroups = [...this.state.groups].filter(i=>i.id !== id);
            this.setState({groups:updatedGroups});
        })
    }
   
    render() {
        const {groups, isLoading} = this.state;
        
        if(isLoading) {
            return <p>Loding...</p>;
        }

        const GroupList = groups.map(group =>{
            const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;
            return <tr key={group.id}>
                <td style={{whiteSpace: 'nowrap'}}>{group.name}</td>
                <td>address</td>
                <td>{group.events.map(event => {
                    return <div key={event.id}>{new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month : 'long',
                        day: '2-digit'
                    }).format(new Date(event.date))}                  
                    </div>
                })}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/group/"+group.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/group/new">Add Group</Button>
                    </div>
                    <h3>My JUG Tour</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">Name</th>
                                <th width="20%">Location</th>
                                <th>Events</th>
                                <th width="10%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GroupList}
                        </tbody>
                    </Table>
                </Container>

            </div>
        )
    }
}
export default GroupList;