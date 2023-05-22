import React, { ChangeEvent, useState } from "react";
import { UserServer } from "../api/api-user";
// import { User } from "../model/user";
import { Recipe } from "../model/recipe";
import { RecipeServer } from "../api/api-recipe";
//import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    briefDescription: "",
    time: "",
    products: "",
    picture: "",
    description: "",
    tags: "",
  });
  // const [products, setProducts] = useState([]);
  // const [tags, setTags] = useState([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // const handleAddItem = () => {
  //   setProducts([...products, formData.product]);
  //   setInputValue("");
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = window.sessionStorage.getItem('user');
    const user = await UserServer.findById(userId);
    
    console.log(userId);

    const recipe = new Recipe(
      undefined,
      user.id,
      formData.title,
      formData.briefDescription,
      formData.time,
      formData.products,
      formData.picture,
      formData.description,
      formData.tags
    );

    console.log(recipe);

    await RecipeServer.create(recipe);

    setFormData({
      title: "",
      briefDescription: "",
      time: "",
      products: "",
      picture: "",
      description: "",
      tags: "",
    });
  };

  return (
    <div className="flex justify-center items-center h-fit">
      <form
        className="bg-white shadow-md rounded px-6 py-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter recipe title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="briefDescription"
          >
            Brief Description
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="briefDescription"
            type="text"
            placeholder="Enter brief description"
            name="briefDescription"
            value={formData.briefDescription}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="time"
          >
            Time
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="time"
            type="text"
            placeholder="Enter time for preparing"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="products"
          >
            Products
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="products"
            type="text"
            placeholder="Enter products"
            name="products"
            value={formData.products}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="picture"
          >
            Picture
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="picture"
            type="text"
            placeholder="Enter the picture URL"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter your description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="tags"
          >
            Tags
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
