import { db } from "../src/utils/db.server";

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublish: Date;
};

function getAuthors(): Array<Author> {
  return [
    {
      firstName: "John",
      lastName: "Doe",
    },
    {
      firstName: "William",
      lastName: "Shakespeare",
    },
    {
      firstName: "Yuval Noah",
      lastName: "Harari",
    },
  ];
}

function getBook(): Array<Book> {
  return [
    {
      title: "Sapiens",
      isFiction: false,
      datePublish: new Date(),
    },
    {
      title: "Homo Deus",
      isFiction: false,
      datePublish: new Date(),
    },
    {
      title: "The ugly duckling",
      isFiction: true,
      datePublish: new Date(),
    },
  ];
}
