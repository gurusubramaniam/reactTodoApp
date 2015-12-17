/** @jsx React.DOM */
var React = require('react');

var SubMessage = React.createClass({
    handleDelete: function(e) {
        this.props.onDelete(this.props.message)
    },
    propTypes : {
        message: React.PropTypes.string.isRequired
    },

    getDefaultProps: function() {
        return {
            message: 'its good to see u '
        }
    },
    render: function(){
        return (
            <div>
            {this.props.message}
        <button onClick= {this.handleDelete} className="btn btn-xs btn-danger">X</button>
            </div>
        );
    }
});
module.exports = SubMessage;