import React, { useState, useEffect } from "react";

const mainURLx = "http://localhost:8080/jpareststarter";
const mainURL = "https://vn41.dk/devops-starter";
const userInfoEndpoint = "/api/info/user";
const adminInfoEndpoint = "/api/info/admin";
const defaultEndpoint = "/api/default";
const loginEndpoint = "/api/login";
const userCount = "/api/info/all";
const searchBook = "/api/book/title/";
const getAllBookTitles = "/api/book";
const addBook = "/api/book";
const deleteBookEnd = "/api/book/";
const loanEnd = "/api/book/loan";

export {
    mainURL,
    userInfoEndpoint,
    adminInfoEndpoint,
    defaultEndpoint,
    loginEndpoint,
    userCount, 
    searchBook,
    getAllBookTitles,
    addBook,
    deleteBookEnd,
    loanEnd
};
