import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Description = () => {
const search = window.location.search;
const params = new URLSearchParams(search);
const src = params.get('src');
const name = params.get('name');
const score = params.get('score');
const id = params.get('id');
const [synopsis,setsynopsis]=useState();
const [video,setvideo]=useState();
const RAPID_KEY=import.meta.env.VITE_RAPID_KEY;

const info1= async ()=>{
  try {
    
    const response = await axios.request(options1);
    setvideo(response.data.trailer);
    setsynopsis(response.data.synopsis);
  } catch (error) {
    console.error(error);
  }
}

const options1 = {
  method: 'GET',
  url: `https://myanimelist-api1.p.rapidapi.com/anime/${id}`,
  headers: {
    'X-RapidAPI-Key': RAPID_KEY,
    'X-RapidAPI-Host': 'myanimelist-api1.p.rapidapi.com'
  }
};

useEffect(()=>{
  info1();
},[])

  return (
    <div className='w-full h-[72vh]'>
      <div className="flex rounded-3xl items-center mx-16 my-10">
        <div className="flex flex-col mr-16">
        <img
          src={src}
          alt={name}
          fill
          className="rounded-xl cursor-pointer"
          />
          <div className="flex mt-3">
         <img
              src="./star.svg"
              alt="star"
              width={18}
              height={18}
              className="object-contain mr-3"
              />
            <p className="text-base font-bold text-[#FFAD49]">{score}</p>
              </div>
          </div>
      <div className="flex flex-col w-[48%]">
         <h2 className="font-bold text-white text-xl line-clamp-1 w-full mb-4">
            {name}
          </h2>
          <p className="mb-4">{synopsis}</p>
      </div>
      <div className="flex flex-col ml-16">
      <iframe
  width="300"
  height="484"
  src={video}
></iframe>
      </div>
      </div>
    </div>

  )
}

export default Description
