import React from 'react';
import PropTypes from 'prop-types';

import ChooseStars from '../../components/Forms/ChooseStars';

const Menu = (props) => {
    if (props.visible) {
        return (
            <div className="ui-block">
                <div className="ui-block-title">
                    <h6 className="title bold personal">
                        {props.user._id === props.activeTransaction.item.user._id
                            ? "Get back"
                            : "Return"
                        }
                    </h6>
                </div>

                <div className="ui-block-content">

                    <label>Please write a review for this transaction</label>
                    <textarea
                        name="comment"
                        id="comment"
                        style={{width:"100%"}}
                        onChange={props.onChangeComment}
                        value={props.comment}
                    />

                    <ChooseStars
                        onChangeRate={props.onChangeRate}
                        rate={props.rate}
                    />

                    <button
                        onClick={props.onReturn}
                        id={props.activeTransaction._id}
                        className="btn btn-green btn-lg full-width"
                        disabled={props.rate === 0 || props.comment === ""}
                    >
                        {props.user._id === props.activeTransaction.item.user._id
                            ? "Get back"
                            : "Return"
                        }
                    </button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="ui-block">
                <div className="ui-block-title">
                    <h6 className="title bold personal">
                        Menu
                    </h6>
                </div>

                <div className="ui-block-content">

                    <div style={{marginBottom: "15px"}}>
                        Please click here when the item has been returned
                    </div>

                    <button onClick={props.toggleReturn} className="btn btn-green btn-lg full-width">
                        {props.user._id === props.activeTransaction.item.user._id
                            ? "Get back"
                            : "Return"
                        }
                    </button>

                </div>
            </div>
        )
    }
};

Menu.propTypes = {
    user: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onReturn: PropTypes.func.isRequired,
    toggleReturn: PropTypes.func.isRequired,
    onChangeRate: PropTypes.func.isRequired,
    rate: PropTypes.number.isRequired,
    activeTransaction: PropTypes.object.isRequired,
    comment: PropTypes.string.isRequired,
    onChangeComment: PropTypes.func.isRequired,
};

export default Menu;