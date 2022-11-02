import { useQuery, gql } from '@apollo/client';

interface Author {
  author: string;
  id: number;
}

const GET_AUTHORS = gql`
  query {
    authors {
      author
      id
    }
  }
`;

function Authors() {

    const { loading, error, data } = useQuery(GET_AUTHORS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : Content could not be loaded</p>;

    return (
        <div>
            <h1>Authors</h1>
            <ul>
              <strong>This is the list of authors</strong>
              {data.authors.map((author: Author) => (
                  <li key={author.id}>
                      <p>{author.author}</p>
                  </li>
              ))}
            </ul>
        </div>
    );
}
  
export default Authors;
  