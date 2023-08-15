
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Card from '../components/Card';

function PopularPage() {
    const getEndpoint = "https://drinks-backend.lm.r.appspot.com/api/drinks/popular";

    const [drinks, setDrinks] = useState([]);
    const getData = useCallback(async () => {
        const { data } = await axios.get(getEndpoint);
        setDrinks(data);
    }, []);

    useEffect(() => {
        getData();
      }, []);
      
    const renderedDrinks = drinks.map((drink) => {
        return (
            <div className="rounded overflow-hidden shadow-lg ">
                <Card drink={drink}></Card>
            </div>
            );
        });

    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-7">
            <Helmet>
                <title>Popular Cocktail Recipes, best alcoholic recipes, cocktails</title>
                <link rel="canonical" href="http://makecocktail.net/popular" />
            </Helmet>
            <div className="p-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
                <div className="col-span-3 mb-7 ml-2"> 
                <h1 className="text-sky-700 text-xl font-bold">TOP 12 COCKTAILS</h1>
                <h2 className="text-lg m-0 font-semibold">Want to impress your friends?</h2>
                <h2 className="text-lg m-0 font-semibold">Here are the top 12 cocktails that everyone crave!</h2>
                </div>
                <div className="col-span-2"></div>
            </div>
            
            <div className="p-1 grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                {renderedDrinks}
            </div>
        </div>
    );
}

export default PopularPage;