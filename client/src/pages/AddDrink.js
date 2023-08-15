import React, { useState, useEffect } from "react";
import axios from "axios";
import DynamicTagList from "../components/DynamicTagList";
import DynamicForm from "../components/DynamicForm";

const postEndpoint = "https://drinks-backend.lm.r.appspot.com/api/drinks";


function AddDrink() {
    const [drink, setDrink] = useState({
        name:"",
        logoLink:"",
        description:"",
        saveError:false,
        saved:false,
    });

    const [tags, setTags] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [mix, setMix] = useState([]);
    const [token, setToken] = useState([]);

    useEffect(() => {
      const jwtToken = localStorage.getItem('token');
      if (jwtToken) {
        setToken(jwtToken);
      }
    }, []);

    let axiosConfig = {
    headers: {
        "x-auth-token": token
        }
    }

    const handleSubmit =  ((e) => {
        e.preventDefault();
        let allIngredients = [];
        let allSteps = [];
        let allTags = [];

        tags.map((tag) => {
            allTags = [...allTags, tag.name]
        });

       ingredients.map((ingredient) => {
            allIngredients = [...allIngredients, ingredient.name]
        });

        mix.map((step) => {
            allSteps = [...allSteps, step.name]
        });

        axios.post(postEndpoint, {
            name: drink.name,
            logo: drink.logoLink,
            description: drink.description,
            tags: allTags,
            ingredients: allIngredients,
            mix: allSteps
          }, axiosConfig)
          .then((response) => {
            setDrink(prevState => ({...prevState, saveError:false, saved:true}))
          })
          .catch((err) => {
            setDrink(prevState => ({...prevState, saveError:err.response.data, saved:false}))
          })
    });
    
    return(
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Cocktail</h2>
        <form action="#" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cocktail Name</label>
                    <input 
                        onChange={(e) => setDrink(prevState => ({...prevState, name:e.target.value}))}
                        type="text" name="name" id="name" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="Type cocktail name" required=""
                    />
                </div>
                <div className="w-full">
                    <label for="logo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Logo URL</label>
                    <input 
                        onChange={(e) => setDrink(prevState => ({...prevState, logoLink:e.target.value}))}
                        type="text" name="logo" id="logo" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="URL of the cocktail image" required=""
                    />
                </div>
                <div className="w-full">
                    <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input 
                        onChange={(e) => setDrink(prevState => ({...prevState, description:e.target.value}))}
                        type="text" name="description" id="description" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="Type cocktail description" required=""
                    />
                </div>
                <div>
                    <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
                    <DynamicTagList 
                        fieldName="tags" 
                        onChange={setTags}
                    />
                </div>
                <div>
                    <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingredients</label>
                    <DynamicForm 
                        fieldName="ingredient" 
                        onChange={setIngredients}
                    />
                </div>
                <div className="col-span-2"/>
                <div className="sm:col-span-2">
                    <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipe to Prepare</label>
                    <DynamicForm 
                        fieldName="Step" 
                        onChange={setMix}
                    />
                </div>
            </div>
            <button type="submit" className="bg-blue-500 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                Add product
            </button>
        </form>
        <div className="mt-6 mb-4">
            {drink.saveError && <div className="flex items-center">
                <p className="ml-1 block text-sm text-red-500 font-semibold">
                    {drink.saveError}
                </p>
            </div>}

            {drink.saved && <div className="flex items-center">
                <p className="ml-1 block text-sm text-green-500 font-semibold">
                    A new cocktail is created! Great.
                    Thanks for your effort.
                </p>
            </div>}
        </div>
    </div>
    )};

export default AddDrink;