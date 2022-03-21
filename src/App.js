import "./App.css";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function App() {
  const { data, error } = useSWR(
    "https://gateway.marvel.com/v1/public/characters?apikey=c02cfe0275994129e91bb12daceca74e",
    fetcher
  );

  if (!data) return <p>Loading!</p>;
  if (error) throw error;

  const marvelData = data.data.results;

  return (
    <div className="App">
      <div id="marvel-cards">
        {marvelData.map((mavItem) => (
          <div className="marvel-card" key={mavItem.id}>
            <img
              src={mavItem.thumbnail.path + "." + mavItem.thumbnail.extension}
              alt={mavItem.name}
            />
            <h1>{mavItem.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
