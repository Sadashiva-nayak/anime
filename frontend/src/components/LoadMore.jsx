
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard from "./AnimeCard";

function LoadMore() {
  let page = 2;
  
  const { ref, inView } = useInView();
  const [data, setdata] = useState([]);

  var key = 0;

    const fetchAnime = async (page) => {
      const response = await fetch(
        `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
      );
    
        const data = await response.json();
        return data;
    };

  useEffect(() => {
    if (inView) {
      fetchAnime(page).then((res) => {
        setdata([...data, ...res]);
        page++;
      });
    }
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
      {data.map((item, index) => (
      <AnimeCard key={key++} anime={item} index={index} />
      ))}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <img
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
