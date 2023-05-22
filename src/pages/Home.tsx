import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { RecipeServer } from "../api/api-recipe";
import { Recipe } from "../model/recipe";
import { useNavigate } from "react-router-dom";
//import { UserServer } from "../api/api-user";

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userId = window.sessionStorage.getItem("user");
      if (userId == null) {
        toast.error("Login First");
      }

      const lastPosts = await RecipeServer.findAll();
      setRecipes(lastPosts.slice(-10));
      console.log(recipes);
    };

    fetchData();
  }, []);

  const routeChange = () => {
    navigate("/createRecipe");
  };

  return (
    <div className="bg-gray-200 p-4">
      {recipes.map((recipe) => (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
          <p className="text-gray-700 mb-2">{recipe.briefDescription}</p>
          <p className="text-gray-600 text-sm mb-2">{recipe.time}</p>
          <p className="text-gray-600 text-sm mb-2">{recipe.products}</p>
          <p className="text-gray-600 text-sm mb-2">{recipe.tags}</p>
          <button
            className=" hover:bg-green-800 bg-green-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            //onClick={}
          >
            edit
          </button>
          <button
            className=" hover:bg-red-700 bg-red-600 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            //onClick={}
          >
            delete
          </button>
        </div>
      ))}

      <button
        className=" hover:bg-orange-600 bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={routeChange}
      >
        Create Recipe
      </button>
    </div>
  );
};

export default Home;

// <div className="flex items-center space-x-2 mb-2">
//           <span className="text-gray-600">Products:</span>
//           {products.map((product) => (
//             <span
//               key={product.id}
//               className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
//             >
//               {product.name}
//             </span>
//           ))}
//         </div>
//         <div>
//           <span className="text-gray-600">Tags:</span>
//           {tags.map((tag) => (
//             <span
//               key={tag.id}
//               className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
//             >
//               {tag.name}
//             </span>
//           ))}
//         </div>
