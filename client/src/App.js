import "./App.css";
import React, { Component } from "react";
import Customer from "./components/(class)Customer";
import CustomerAdd from "./components/CustomerAdd";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { withStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";

const styles = {
  root: {
    width: "100%",
    // marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    // minWidth: 1080,
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: "",
      completed: 0,
    };
  }

  stateRefresh = () => {
    this.setState({
      customers: "",
      completed: 0,
    });
    this.callApi()
    .then((res) => this.setState({ customers: res }))
    .catch((err) => console.log(err));
  };

  componentDidMount() {
    // 0.02초 마다 progress 함수 실행
    // this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => this.setState({ customers: res }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };

  render() {
    const { classes } = this.props;
    return (
      // <ThemeProvider theme={theme}>
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? (
                this.state.customers.map((c) => {
                  return <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />;
                })
              ) : (
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
      // </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
