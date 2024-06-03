import React, { useEffect, useState } from 'react'
import AnimeCard from './AnimeCard';

const Explore = () => {

const [data,setdata]=useState([]);

  const fetchAnime = async (page) => {
    const response = await fetch(
      `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
    );
  
      const data = await response.json();
      setdata(data);
  };

  useEffect(()=>{
    fetchAnime(1);
  },[])
  return (
    <>
    <h2 className="text-3xl text-white font-bold">Explore Anime</h2>
    <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
  {data.map((item, index) => (
      <AnimeCard key={item.id} anime={item} index={index} />
    ))}
    </section>
    </>
  )
}

export default Explore
