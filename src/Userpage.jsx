import React, { useEffect, useState } from "react";
import "./App.css";
import facade from "./apiFacade";

function Userpage() {
  const [errorUser, setErrorUser] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error");
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState([]);
  const [bookTitles, setBookTitles] = useState([]);
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
  };

  const getBookTitles = () => {
      facade.fetchAllBooks(setBookTitles);
  }

  return (
    <div>
      <h3>{dataFromServer}</h3>
      <p>{errorUser}</p>
      {facade.isAdmin().indexOf("user") !== -1 && (
        <>
          <p>Search by title</p>
          <input type="text" id="bookTitle" onChange={handleChange} />
          <button onClick={submitTitle}>Find books</button>
          <br />
          <br />
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
                return (
                  <>
                    <tr>
                      <td>{x.isbn}</td>
                      <td>{x.title}</td>
                      <td>{x.publisher}</td>
                      <td>{x.publishYear}</td>
                      <td>
                        {x.authors.map((y) => {
                          return <p>{y.name}</p>;
                        })}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <p>List of all books here</p>
          <button onClick={getBookTitles}>Get all titles in library</button>
          <table>
              <tbody>
                  {bookTitles.map((titles) => {
                      return(
                          <tr>
                              <td>{titles}</td>
                          </tr>
                      );
                  })}
              </tbody>
          </table>
        </>
      )}
    </div>
  );
}
export default Userpage;