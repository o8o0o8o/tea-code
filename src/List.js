import "./List.css";
import { useEffect, useState } from "react";

function List({ apiResponse }) {
  const [selectedIDs, setSelectedIDs] = useState(new Set());

  useEffect(() => {
    console.log(selectedIDs);
  }, [selectedIDs]);

  const handleCheckBoxClick = (id) => {
    setSelectedIDs((prevState) => {
      if (prevState.has(id)) {
        prevState.delete(id);

        const arr = Array.from(prevState);

        return new Set(arr);
      }

      const arr = Array.from(prevState);

      arr.push(id);

      return new Set(arr);
    });
  };
  return (
    <ul>
      {apiResponse &&
        apiResponse.map((person) => (
          <li key={person.id} onClick={() => handleCheckBoxClick(person.id)} className='card'>
            <img src={person.avatar} alt="avatar" className="image"/>
            <div>{`${person.first_name} ${person.last_name}`}</div>
            <input
              type="checkbox"
              checked={selectedIDs.has(person.id)}
              // onChange={() => ()}
            />
          </li>
        ))}
    </ul>
  );
}

export default List;
