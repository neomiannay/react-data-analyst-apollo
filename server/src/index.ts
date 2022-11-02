import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';

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

const books: Book[] = [
    {
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K. Rowling",
        id: 1,
        rate: 4
    },
    {
        title: "Jurassic Park",
        author: "Michael Crichton",
        id: 2,
        rate: 5
    },
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        id: 3,
        rate: 5
    }
]

const getAuthors = (books: Book[]): Author[] => {
    const authors = books.map(({author, id}) => ({ author, id }));
    return authors;
}

const typeDefs = `#graphql
    type Book {
        title: String
        author: String
        id: Int
        rate: Int
    }

    type Author {
        author: String
        id: Int
    }

    type Query {
        books: [Book]
        authors: [Author]
        bookById(id: Int): Book
    }
`

const resolvers = {
    Query: {
        books: () => books,
        authors: () => getAuthors(books),
        bookById: (parent: any, args: any) => books.find(book => book.id === args.id)
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);