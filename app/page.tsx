'use client';

import { useEffect, useState } from "react";
import axios from "axios";

type Person = {
  id: number;
  name: string;
  age: number;
};

function App() {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
   axios.get<Person[]>('http://127.0.0.1:8000/api')
  .then(res => setPeople(res.data))
  .catch(err => console.error("Failed to fetch people:", err.response?.status, err.message));
  }, []);

  return (
    <div>
      {people.map((p) => (
        <p key={p.id}>
          {p.id} {p.name} {p.age}
        </p>
      ))}
    </div>
  );
}

export default App;
