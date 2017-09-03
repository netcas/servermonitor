import React, { Component } from 'react';
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment, Label, Icon } from 'semantic-ui-react'
import ServerChart from './ServerChart'
// import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataType: 'realtime'
    };
  }

  handleClick = (dataType) => { console.log(dataType); this.setState({ dataType: dataType }); }

  render() {
    return (
      <Container style={{ marginTop: "2em" }}>
        <Header as="h2">服务器监控</Header>
        <Button.Group widths="3" color="blue">
          <Button onClick={() => this.handleClick("realtime")}>实时</Button>
          <Button onClick={() => this.handleClick("today")}>今天</Button>
          <Button onClick={() => this.handleClick("week")}>最近一周</Button>
        </Button.Group>
        <Divider />
        <ServerChart dataType={this.state.dataType} />
        <Divider />
        Copyright &copy; Netcas 2017
      </Container>
    );
  }
}

export default App;
