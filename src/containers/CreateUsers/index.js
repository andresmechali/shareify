import React from 'react';
import { withApollo } from 'react-apollo';

import TEST_CREATE_USERS from "../../utils/queries/TEST_CREATE_USERS";

class CreateUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: [],
        }
    }

    componentWillMount() {
        this.props.client.mutate({
            mutation: TEST_CREATE_USERS,
            variables: {
                number: 2,
            }
        })
            .then(res => {
                this.setState({loading: false})
                console.log(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    Loading
                </div>
            )
        }
        else {
            return (
                <div>
                    Users created
                </div>
            )
        }
    }
}

export default withApollo(CreateUsers);