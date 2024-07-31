import { gql, useMutation } from "@apollo/client";
import React, { FormEvent, useState } from "react";
import { GET_USER } from "../App";
import { client } from "../lib/apollo";

const CREATE_USER = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export const NewFormUser: React.FC = () => {
  const [name, setName] = useState("");
  const [createUser] = useMutation(CREATE_USER);

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();

    if (!name) return;

    await createUser({
      variables: {
        name,
      },
      update: (cache, { data: { createUser } }) => {
        const { users } = client.readQuery({ query: GET_USER });

        cache.writeQuery({
          query: GET_USER,
          data: { users: [...users, createUser] },
        });
      },
    });

    setName("");
  }

  return (
    <form onSubmit={handleCreateUser}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};
