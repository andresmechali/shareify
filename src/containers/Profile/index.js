import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { withApollo } from 'react-apollo';

import USER_QUERY from '../../utils/queries/USER_QUERY';

import { addFlashMessage, deleteFlashMessage } from "../../redux/actions/flashMessages";

import Loading from '../../components/Loading/FadingCircle';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            loading: true
        }
    }

    componentWillMount() {
        this.props.client.query({
            query: USER_QUERY,
            variables: {_id: this.props.auth.user._id},
        })
            .then(res => {
                console.log(res.data.userById)
                this.setState({
                    user: res.data.userById,
                    loading: false
                })
            })
            .catch(err => {
                console.log('error:')
                console.log(err)
            })
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="container">
                    <Loading />
                </div>
            )
        }
        return (
            <div className="container">
                <ul>
                    {this.state.user.offered.map(offered => (
                        <li>{offered.name}</li>
                        )
                    )}
                </ul>
            </div>
        )

    }
}

Profile.propTypes = {

};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        push: (path) => dispatch(push(path)),
        addFlashMessage: (msg) => dispatch(addFlashMessage(msg)),
        deleteFlashMessage: () => dispatch(deleteFlashMessage()),
    }
};

//export default withUser(connect(mapStateToProps, mapDispatchToProps)(Profile));
export default withApollo(connect(mapStateToProps, mapDispatchToProps)(Profile));