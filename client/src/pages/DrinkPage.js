import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";

const getEndpoint = "https://drinks-backend.lm.r.appspot.com/api/drinks";

function DrinkPage() {
    const [drink, setDrink] = useState({});
    //For the list
    const [renderedIngredients, setRenderedIngredients] = useState(false);
    const [renderedMix, setRenderedMix] = useState(false);

    let { drinkName } = useParams();
    let pathName = useLocation().pathname;
    drinkName = _.startCase(drinkName)

    useEffect(() => {
        getData();
      }, []);

    const getData = async () => {
        const { data } = await axios.get(getEndpoint, {params: {name: drinkName}})

        const drinkSetter = async () => {
            setDrink(data[0]);
        }

        const renderText = async () => {
            setRenderedIngredients(data[0].ingredients.map((i) =>{
                return <li className="list-disc">{i}</li>
            }));
            setRenderedMix(data[0].mix.map((i)=> {
                return <li className="list-decimal mb-2">{i}</li>
                })
            )}         
        await renderText();
        await drinkSetter();
        };

    return (
        <div itemprop="recipeCategory" className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <Helmet>
                <title>{drink.name}</title>
                <link rel="canonical" href={"http://makecocktail.net" + pathName} />
                <meta name="description" content={"Check how to make "+drink.name+". "+drink.description}/>
            </Helmet>
            <>
                <h1 className="text-blue-800 text-xl font-bold mt-6 ml-2">{drink.name}</h1>
                <h3 className="text-s ml-2">{drink.description}</h3>
            </>
            <div className="p-1 grid grid-cols-5 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-2xl:grid-cols-10">
		        <div className="col-span-3 p-3 w-3/4">
                    <>
                        <img src={drink.logo} alt="displayed cocktail" className="rounded-lg border-2" />
                    </>
                </div>
                <div className="col-span-4 ">
                    <div itemprop="recipeIngredient" >
                    <u className="italic"> Ingredients:</u>
                    {renderedIngredients}
                    </div>
                    <div itemprop="recipeInstructions" className="mt-6">
                    <u className="italic"> How to mix: </u>
                    {renderedMix}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DrinkPage;