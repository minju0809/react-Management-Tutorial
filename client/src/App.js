import "./App.css";
import React, { Component } from "react";
import Customer from "./components/Customer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { withStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";
// import { ThemeProvider, ThemeContext } from "@emotion/react";
// import { createTheme } from "@mui/system";

// let theme = {};

const styles = {
  root: {
    width: "100%",
    // marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    // margin: theme.spacing.unit * 2,
  },
};

class App extends Component {
  state = {
    customers: "",
    completed: 0,
  };

  componentDidMount() {
    // 0.02초 마다 progress 함수 실행
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => this.setState({ customers: res }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    return (
      // <ThemeProvider theme={theme}>
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
                <TableCell colSpan="6" alige="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
      // </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
