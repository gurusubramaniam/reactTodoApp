/** @jsx React.DOM */
var React = require('react');
var SubMessage = require('./SubMessage');

var MessageBox = React.createClass({

    deleteMessage: function(message){
        var newMessages = _.without(this.state.messages, message);
        this.setState({
            messages: newMessages
        });
    },
    handleAdd: function(e){
        var newMessage = this.refs.newMessage.value;
        var newMessages = this.state.messages.concat([newMessage]);
        this.setState({
            messages : newMessages
        });
    },
    componentDidMount: function() {
        $.get('https://gurureactsampleapp.firebaseio.com/'+ this.props.url + '/.json').then(function(data){
            console.log('Data is ', data);
            this.setState({
                metric : data
            });
        }.bind(this));
    },
    componentWillReceiveProps: function(nextProps){
        var lastUrl= this.props.url;
        debugger;
        $.get('https://gurureactsampleapp.firebaseio.com/'+ nextProps.url + '/.json').then(function(data){
            console.log('Data is ', data);
            this.setState({
                lastUrl: lastUrl,
                metric : data
            });
        }.bind(this));

    },
    getInitialState: function(e) {
        return {
            isVisible : true,
            messages : [],
            metric: 0,
            lastRoute:''
        };
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return true;
    },
    render: function() {
        var inlineStyles = {
            display: this.state.isVisible ? 'block' :'none'
            },
            messages = this.state.messages.map(function(message){
                return <SubMessage message={message} onDelete={this.deleteMessage} />;
            }.bind(this));

        return (
            <section className="container" style={inlineStyles}>
                <div className="toDO">
                    <h1>TO DO APP</h1>
                    <input ref="newMessage" type="text" />
                    <button className="btn btn-primary" onClick={this.handleAdd}>Add</button>
                    {messages}
                </div>
                <div className="ApiData">
                    <h2>Playing around with api data </h2>
                    {this.state.lastRoute}
                    {this.state.metric}
                </div>
            </section>
        );
    }
});

module.exports = MessageBox;