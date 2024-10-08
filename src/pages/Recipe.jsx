import { useParams } from "react-router-dom";
import { useRecipeId } from "../hooks/useRecipeId";
import { getAllIngredients } from "../utils/utils";
import Nav from "../components/Nav";
import HeaderRecipe from "../components/HeaderRecipe";
import Ingredients from "../components/Ingredients";
import Instructions from "../components/Instructions";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useScrollTop } from "../hooks/useScollTop";
import { useEffect, useState } from "react";

function Recipe() {
  const { id } = useParams();
  const recipe = useRecipeId(id);
  const ingredients = getAllIngredients(recipe);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useScrollTop();
  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <Nav />

      {loading ? (
        <Loading height={"80"} />
      ) : (
        <div className="flex flex-col px-4 py-10 gap-4 border border-dark/30 rounded-[32px] xl:gap-10 xl:px-20 xl:py-14 ">
          <HeaderRecipe recipe={recipe} />
          <div className="flex flex-col gap-4 sm:m-auto xl:flex-row-reverse xl:gap-10 xl:m-auto">
            <Ingredients ingredients={ingredients} />
            <Instructions instructions={recipe.strInstructions} />
          </div>
        </div>
      )}

      <Newsletter />
      <Footer />
    </div>
  );
}

export default Recipe;
