import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

interface Author {
  author: string;
  title?: string;
}

interface Book {
  title: string;
  author: string;
  id: number;
  rate?: number;
}

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
    }
  }
`;

function Home() {

  const { loading, error, data } = useQuery(GET_LOCATIONS);

  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBooks = async () => {
    const response = await fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: '{ books { title, author, id, rate } }' }),
      });
    const dataBooks = await response.json();
    setBooks(dataBooks.data.books);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  
  return (
    <div>
      <h1>Home</h1>
      {isLoading && <h3>Loading...</h3>}
      {!isLoading && books.map(({id, title, author, rate}) => (
        <React.Fragment key={id}>
          <h2>{title}</h2>
          <p>Author: {author}</p>
          <p>rate: {rate}/10</p>
        </React.Fragment>
        ))
      }
    </div>
  );
}
  
export default Home;
  