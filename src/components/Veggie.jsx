import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Veggie = () => {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");
    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10&tags=vegetarian`
      );
      const data = await res.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
    }
  };

  return (
    <>
      <Wrapper>
        <h4>Vegetarian Picks</h4>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "2rem",
            fixedHeight: "290px",
          }}
        >
          {veggie.map((recipe) => {
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
  margin: 2rem 0rem;
`;
const Card = styled.div`
  min-height: 25rem;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    width: 450px;
    height: 280px;
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
    bottom: 33%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 0.9rem;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Veggie;
