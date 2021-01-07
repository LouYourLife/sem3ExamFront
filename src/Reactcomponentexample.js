import React, { Component } from 'react';

class TableOfNames extends React.Component {
    constructor(props) {
        super(props)
        
    }

    makeTable() {
        return (
            <table>
            <tr><th>First name</th><th>Last name</th></tr>
      {this.props.names.map(p=><tr><td>{p.fname}</td><td>{p.lname}</td></tr>)}
          </table>
        )
    };

    render() {
        return (
            this.makeTable()
        )
    }
}

export default TableOfNames;