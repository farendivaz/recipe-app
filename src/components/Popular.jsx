import { useEffect, useState } from "react";

const Popular = () => {
  useEffect(() => {
    getPopularRecipes();
  }, []);
  // const [popular, setPopular] = useState(data);
  const getPopularRecipes = async () => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`
    );
    const data = await res.json();
    console.log(data);
  };
  return <div>Popular</div>;
};

export default Popular;
