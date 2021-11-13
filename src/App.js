
import './App.css';
import React from 'react';
import { useParams } from "react-router";
import { Route,Routes,Link,BrowserRouter } from "react-router-dom";
function ShowAnimeCard(anime) {

  function getAnimeName(str) {
    var i, frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }
  const animeDetails = anime.anime
  return (
    <Link to={"facts/"+ animeDetails.anime_name}><div className="cursor-pointer border-2 rounded p-4 h-64 w-80 md:w-96 bg-gray-200" ><img alt ="" className ="object-contain h-48 w-full" src={animeDetails.anime_img } /><div><p className="text-center md:text-xl">{getAnimeName(animeDetails.anime_name)}</p></div></div></Link>
    
  )
}
function ShowAnimeFact(fact) {
  let factDetails = fact.fact
   return (
     <div className="border-2 rounded p-4 bg-gray-200" ><p> {factDetails.fact}</p></div>
    
  )
}
function AnimeFacts() {
  let { id } = useParams();
  const [animeFactList, setAnimeFactList] = React.useState([]);
  const [animeImg, setAnimeImg] = React.useState("");
  React.useEffect(() => {
    let isMounted = true;    
    fetch('https://anime-facts-rest-api.herokuapp.com/api/v1/'+id)
      .then(results => results.json())
      .then(data => {
        if (isMounted) {
          setAnimeFactList(data.data)
          setAnimeImg(data.img)
        }
      });
    return () => { isMounted = false };
  }, []);
  const listItems = animeFactList.map((d) => <div key={d.fact_id} className="p-2"><ShowAnimeFact fact={d} /></div>);
  return (<div>
    <img alt ="" className ="object-contain h-48 w-full" src={animeImg } />
    {listItems}</div>)
}

function AnimeList() {
  const [animeList, setAnimeList] = React.useState([]);
  React.useEffect(() => {
    let isMounted = true;    
    fetch('https://anime-facts-rest-api.herokuapp.com/api/v1')
      .then(results => results.json())
      .then(data => {
        if (isMounted) {
          setAnimeList(data.data)
        }
      });
    return () => { isMounted = false };
  }, []);
  const listItems = animeList.map((d) => <div key={d.anime_name}><ShowAnimeCard anime={d} /></div>);
  return (
<div className="App p-20">
      <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 gap-4">
        {listItems}
      </div>
      
      </div>
  )
}
function App() {
  
  return (
    <BrowserRouter>
     <Routes>
    <Route 
  exact 
  path="/" 
   element={<AnimeList />}
      />
      <Route path="/facts/:id" element={ <AnimeFacts />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
