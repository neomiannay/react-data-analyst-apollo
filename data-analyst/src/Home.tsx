import { useQuery, gql } from '@apollo/client';

interface Book {
  title: string;
  author: string;
  id: number;
  rate?: number;
}

const GET_BOOKS = gql`
  query {
    books {
      title
      author
      id
      rate
    }
  }
`;

function Home() {

  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : Content could not be loaded</p>;

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {data.books.map((book: Book) => (
          <li key={book.id}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>rate: {book.rate}/10</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
  
export default Home;
  