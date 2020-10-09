import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
    state = { 
        hasError: false
     }
     static getDerivedStateFromProps(error) {
         return {hasError: true};
     }
    render() { 
        if (this.state.hasError) {
            return (
                <h1>{this.props.message}</h1>
            );
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    message: PropTypes.string
}

export default ErrorBoundary;