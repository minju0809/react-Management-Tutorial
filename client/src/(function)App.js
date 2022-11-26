import "./App.css";
import { useState, useEffect } from "react";
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

function App(props) {
  const [state, setState] = useState("");

  // 14강
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     customer: "",
  //     completed: 0,
  //   };
  // }

  // stateRefresh = () => {
  //   setState({
  //     customers: "",
  //     completed: 0,
  //   });
  //   callApi()
  //     .then((res) => this.setState({ customers: res }))
  //     .catch((err) => console.log(err));
  // };

  const callApi = async () => {
    const response = await fetch("/api/customers");
    // console.log(response);
    const body = await response.json();
    return body;
  };

  useEffect(() => {
    callApi()
      .then((res) => setState({ customers: res }))
      .catch((err) => console.log(err));
  }, []);

  const { classes } = props;
  return (
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
            {state.customers ? (
              state.customers.map((c) => {
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
      <CustomerAdd stateRefresh={stateRefresh} />
    </div>
  );
}

export default withStyles(styles)(App);
