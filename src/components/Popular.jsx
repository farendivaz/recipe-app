import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Popular = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopularRecipes();
  }, []);

  const getPopularRecipes = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`
      );
      const data = await res.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <>
      <Wrapper>
        <h4>Popular Picks</h4>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "1rem",
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    width: 350px;
    height: 250px;
    position: absolute;
    /* width: 100%;
    height: 100%; */
    object-fit: cover;
    filter: brightness(80%);
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 20%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Popular;
