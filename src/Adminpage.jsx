import React, { useEffect, useState } from "react";
import "./App.css";
import facade from "./apiFacade";

function Adminpage() {
  const [errorAdmin, setErrorAdmin] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error!");
  const [newBook, setNewBook] = useState({});
  const [authors, setAuthors] = useState([]);

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

  // Clean up!
  const handleChange = (event) => {
      const target = event.target;
      const value = target.value;
      const prop = target.id;
      if(prop === "authors") {
        const authorList = [ ...authors];
        setAuthors(authorList);
    }
      const book = { ...newBook, [prop]: value};
      newBook.authors = authors;
      setNewBook(book);
  };

  // Clean up!
  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(newBook);

      let isbn = document.getElementById("isbn").value;
      let title = document.getElementById("title").value;
      let publisher = document.getElementById("publisher").value;
      let publishYear = document.getElementById("publishYear").value;
      let author1 = document.getElementById("author1").value;
      let author2 = document.getElementById("author2").value;
      console.log(isbn);
      console.log(title);
      console.log(publisher);
      console.log(publishYear);
      console.log(author1);
      console.log(author2);
      let book2 = {
        isbn: isbn,
        title: title,
        publisher: publisher,
        publishYear: publishYear,
        authors: [{ name: author1 }, { name: author2 }],
      };
      console.log(book2);
      facade.postBook(book2);
  };

  const [delBook, setDelBook] = useState();
  const handleDelete = (event) => {
      const target = event.target;
      const value = target.value;
      setDelBook(value);
      console.log("1) "+delBook);
  }

  const deleteBook = (e) => {
      const id = e.target.id;
      facade.deleteBook(delBook, setDelBook);
      //facade.deleteBook(id, setDelBook);
      console.log("2) "+delBook);
      console.log("3) " + id);
  }

  return (
    <div>
      <h3>{dataFromServer}</h3>
      <p>{errorAdmin}</p>
      {facade.isAdmin().indexOf("admin") !== -1 && (
        <>
          <p>Test</p>
          <p>Add new book</p>
          <p>isbn</p>
          <input 
          type="number"
          id="isbn"
          onChange={handleChange}
          />
          <p>title</p>
          <input
          type="text"
          id="title"
          onChange={handleChange}
          />
          <p>publisher</p>
          <input
          type="text"
          id="publisher"
          onChange={handleChange}
          />
          <p>publishYear</p>
          <input
          type="number"
          id="publishYear"
          onChange={handleChange}
          />
          <p>authors</p>
          <input
          type="text"
          id="author1"
          onChange={handleChange}
          />
          <input
          type="text"
          id="author2"
          onChange={handleChange}
          />
          <br/>
          <button onClick={handleSubmit}>Add Book</button>
          <br/>
          <br/>
          <div>
              <p>Delete book by ISBN number</p>
          <input
          type="number"
          id="isbnDel"
          onChange={handleDelete}
          />
          <button onClick={deleteBook}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
export default Adminpage;
