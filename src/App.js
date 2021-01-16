import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useLocation,
  useParams,
  Prompt,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import Login from "./Login";
import facade from "./apiFacade";
import LoggedIn from "./LoggedIn";
import LoginForm from "./loginForm";
import Userpage from "./Userpage";
import Adminpage from "./Adminpage";

function App() {
  const [errorMes, setErrorMes] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  let history = useHistory();

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)

      .then((res) => setLoggedIn(true))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorMes(err.message);
        });
      });
  };

  const setLoginStatus = (status) => {
    setLoggedIn(status);
    history.push("/");
  };

  return (
    <div>
      <Header loginMsg={loggedIn ? "Logout" : "Login"} loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/page1">
          {/* Change */}
          <FetchDefault />
        </Route>
        <Route path="/page2">
          <FetchUserCount />
        </Route>
        <Route path="/page3">
          {/* <User /> */}
          <Userpage />
        </Route>
        <Route path="/page4">
          {/* <Admin /> */}
          <Adminpage />
        </Route>
        <Route path="/login">
          {!loggedIn ? (
            <LoginForm
              errorMes={errorMes}
              setErrorMes={setErrorMes}
              login={login}
            />
          ) : (
            <div>
              <LoggedIn />
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

// Remove
function FetchDefault() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    facade.fetchDefault(setArray);
  }, []);

  return (
    <div>
      <h3>Data fetched from api:</h3>
      <ul>
        {array.map((data) => {
          return <li>{data}</li>;
        })}
      </ul>
    </div>
  );
}

function FetchUserCount() {
  const [count, setCount] = useState();

  useEffect(() => {
    facade.fetchCount(setCount);
  }, []);
  
  return (
    <div>
      <h3>Amount of users in database:</h3>
      <p>{count}</p>
    </div>
  );
}

function Header({ loggedIn, loginMsg }) {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/page1">
          Page 1
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/page2">
          Page2
        </NavLink>
      </li>
      {loggedIn && (
        <>
          <li>
            <NavLink activeClassName="active" to="/page3">
              Page 3
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/page4">
              Page 4
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink exact activeClassName="active" to="/login">
          {loginMsg}
        </NavLink>
      </li>
    </ul>
  );
}

function NoMatch() {
  let location = useLocation();
  return (
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  );
}

function Home() {
  return (
    <>
      <h3>Use instructions</h3>
      <p>
        In settings.js, change the URL's to match the current project.<br/>
        Refactor navlinks to match project domain.<br/>
        Page 1 diplayes fetched results from default endpoint in backend.<br/>
        Page 2 is a blank slate. <br/>
        Login page allows a user to login, if username and password is in the database.<br/>
        Page 3 (after login) shows info about the user.<br/>
        Page 4 (after login) shows info about admin user.
      </p>
    </>
  );
}

function Placeholder() {
  return <h3>TODO</h3>;
}

// Can be deleted, moved to Userpage
function User() {
  const [errorUser, setErrorUser] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error");
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState([]);
  useEffect(() => {
    facade
      .fetchDataUser()
      .then((data) => setDataFromServer(data.msg))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorUser(err.message);
        });
      });
  }, []);

  const handleChange = (event) => {
    const target = event.target;
    const property = target.id;
    const value = target.value;
    setTitle(value);
  };

  const submitTitle = () => {
    facade.fetchBookByTitle(setBooks, title);
  }

  return (
    <div>
      <h3>{dataFromServer}</h3>
      <p>{errorUser}</p>
      {facade.isAdmin().indexOf("user") !== -1 && (
        <>
        <p>Search by title</p>
      <input
      type="text"
      id="bookTitle"
      onChange={handleChange}
      />
      <button onClick={submitTitle}>
        Find books
      </button>
      <br/>
      <br/>
      <table>
        <thead>
          <tr>
            <th>ISBN Number</th>
            <th>Book Title</th>
            <th>Publisher</th>
            <th>Published Year</th>
            <th>Author(s)</th>
          </tr>
        </thead>

        <tbody>
          {books.map((x) => {
            return(
              <>
              <tr>
                <td>{x.isbn}</td>
                <td>{x.title}</td>
                <td>{x.publisher}</td>
                <td>{x.publishYear}</td>
                <td>{x.authors.map((y) => {
                  return(
                    <p>{y.name}</p>
                  );
                })}</td>
              </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <p>List of all books here</p>
        </>
      )}
      
    </div>
  );
}

// Can be deleted, moved to Adminpage
function Admin() {
  const [errorAdmin, setErrorAdmin] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error!");

  useEffect(() => {
    facade
      .fetchDataAdmin()
      .then((data) => setDataFromServer(data.msg))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorAdmin(err.message);
        });
      });
  }, []);

  return (
    <div>
      <h3>{dataFromServer}</h3>
      <p>{errorAdmin}</p>
      {facade.isAdmin().indexOf("admin") !== -1 && (
        <>
        <p>Test</p>
        </>
      )}
    </div>
  );
}

export default App;
