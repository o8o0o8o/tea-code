import "./App.css";
import { useEffect, useRef, useState } from "react";
import List from "./List";

function App() {
  const [apiResponse, setApiResponse] = useState(null);

  const inputSearch = useRef();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json"
      );
      const data = await response.json();

      data.sort((a, b) => {
        if (a.last_name > b.last_name) {
          return 1;
        }

        return -1;
      });

      setApiResponse(data);
    }
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const searchFor = String(inputSearch.current.value).toLocaleLowerCase();

    const filtered = apiResponse.filter(
      (person) =>
        person.first_name.toLocaleLowerCase() === searchFor ||
        person.last_name.toLocaleLowerCase() === searchFor
    );

    setApiResponse(filtered);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className='form'>
        <input type="text" ref={inputSearch} required />
        <input type="submit" />
      </form>
      <List apiResponse={apiResponse} />
    </div>
  );
}

export default App;
