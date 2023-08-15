import axios from "axios";
import React, { useState, useEffect } from "react";
import FilterList from '../components/FilterList';
import Card from '../components/Card';
import { Helmet } from "react-helmet";


function AllPage() {
    const getEndpoint = "https://drinks-backend.lm.r.appspot.com/api/drinks";

    const [drinks, setDrinks] = useState([]);
    const [selection, setSelection] = useState(null);

    const handleSelection = (option) => {
        setSelection(option);
    };

    const getData = async () => {
        const { data } = await axios.get(getEndpoint, {params: {tags:selection}});
        setDrinks(data);
    };

    useEffect(() => {
        getData();
      }, []);
      
    const renderedDrinks = drinks.map((drink) => {
        if(drink.tags.includes(selection) || selection === null ){
        return (
                <div className="rounded overflow-hidden shadow-lg col">
                    <Card key={drink.name} drink={drink}></Card>
                </div>
                )};
        });
    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-7">
            <Helmet>
                <title>All possible cocktails</title>
                <link rel="canonical" href="http://makecocktail.net/all" />
                <meta name="description" content="All the amazing cocktails that you can make in your home. Try these recipes and you will love them."/>
            </Helmet>
            
            <div className="p-1 grid grid-cols-8 sm:grid-cols-11 md:grid-cols-11 lg:grid-cols-11 xl:grid-cols-11 gap-5">
                <h3 className="col-span-6 md:col-span-3 ml-6 md:ml-1">
                <FilterList value={selection} onClick={handleSelection}/>
                </h3>
                <div className="m-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 col-span-8 m-2">
                    {renderedDrinks}
                </div>
            </div>
            <h1 className="flex text-sm text-white">End of All Cocktail Recipes...</h1>
        </div>
    );
}

export default AllPage;