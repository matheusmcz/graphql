import { gql, useQuery } from "@apollo/client";
import { NewFormUser } from "./components/NewFormUser";

type User = {
  id: string;
  name: string;
};

export const GET_USER = gql`
  query {
    users {
      id
      name
    }
  }
`;

function App() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USER);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <main>
      <div>
        <h3>User list</h3>
        <ul>
          {data?.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
      <NewFormUser />
    </main>
  );
}

export default App;
