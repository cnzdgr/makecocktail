import { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { Helmet } from "react-helmet";

import SelectionList from '../components/SelectionList';
import AddList from '../components/AddList';
import AddedList from '../components/AddedList';
import PossibilityList from '../components/PossibilityList';
import TryList from "../components/TryList";
import headerImage from "../header-image.jpg";
import {allIngredientArray} from '../categoryData/IngredientArray';
import { GiChoice } from 'react-icons/gi';

const getEndpoint = "https://drinks-backend.lm.r.appspot.com/api/drinks";
const getShortEndpoint = "https://drinks-backend.lm.r.appspot.com/api/drinks/short";


function Builder() {
    //Keeping the initial data
    const [allDrinks, setAllDrinks] = useState([]);
    const [selectedDrinks, setSelectedDrinks] = useState([]);

    //Stores ingredient type (max 1 type at any given time) and added ingredient array
    const [typeSelection, setTypeSelection] = useState({label: '', value: ''});
    const [ingredientArray, setIngredientArray] = useState([]);

    //Retrieves the full data of drinks that are feasible with given ingredients arary
    const [possibleDrinksData, setPossibleDrinksData] = useState([]);
    //Filtering with excluded/not-addded ingredients (filter our if find 1 of the excluded ingredients) requires less computation
    const [excludedIngredientArray, setExcludedIngredientArray] = useState([]);


    const getInitialData = useCallback(async () => {
        const { data: selectedData } = await axios.get(getEndpoint, {params: {try: "true"}});
        setSelectedDrinks(selectedData);
        const {data: shortData } = await axios.get(getShortEndpoint )
        setAllDrinks(shortData);
    }, []);

    useEffect(() => {
        getInitialData();
      }, [getInitialData]);

    const ingredientChange = async (currentIngredientArray) => {
        //Check what is excluded first
        const missingIngredients = allIngredientArray.filter(n => !currentIngredientArray.includes(n));
        setExcludedIngredientArray(currentIngredientArray);

        //Check the names of drinks that can be made with given ingredients
        let feasibleDrinks = [];
        allDrinks.map((drink) => {
            if (!drink.tags.some(r=> missingIngredients.indexOf(r) >= 0)){
                feasibleDrinks = [...feasibleDrinks, drink.name]
            }
        });       
 
        //Get complete data of drinks that we have name info
        if (feasibleDrinks.length > 0){
            const { data: possibleData} = await axios.get(getEndpoint, { params: {name: feasibleDrinks}})
            setPossibleDrinksData(possibleData);
        } else {
            setPossibleDrinksData([]);
        }
    }

    const handleAddition = (async (option)=> {
        if (!ingredientArray.includes(option.value)){
            const fastIngredientArray = [...ingredientArray, option.value]
            setIngredientArray(fastIngredientArray);
            await ingredientChange(fastIngredientArray);
        } else {
            setIngredientArray(ingredientArray);
        }
    });

    const handleDeletion = (async (option) => {
        const fastIngredientArray = ingredientArray.filter(item => item !== option)
        setIngredientArray (fastIngredientArray);
        await ingredientChange(fastIngredientArray);
    });

    return(
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <Helmet>
                <link rel="canonical" href="http://makecocktail.net" />
            </Helmet>
        <div class=" overflow-hidden">
            <div class="bg-white pt-2 pb-2 sm:pt-2 lg:overflow-hidden">
            <div class=" max-w-5xl lg:px-2">
                <div class="lg:grid lg:grid-cols-2 lg:gap-3">
                <div class="mx-auto max-w-md px-1 text-center sm:max-w-2xl sm:px-2  lg:px-0 lg:text-left grid grid-cols-4" >
                    <div className="col-span-3">
                    <h1 class="text-2xl font-bold tracking-tight text-black sm:mt-2 sm:text-3xl lg:mt-3 xl:text-3xl">
                        <span class="block text-sky-700">Cocktail Recipes with ingredients in your home! </span>
                    </h1>
                    <h2 class="mt-3 text-lg text-gray-700 sm:mt-5 sm:text-lg lg:text-lg xl:text-xl font-semibold ">
                        <span class="block"> Select all the ingredients that you have, and we list all the cocktail recipes that you can easily prepare</span>
                    </h2>
                    </div>
                    <div className="w-full bg-white grid  ">
                        <img src={headerImage} alt="the cocktail" className="rounded-xl object-contain h-48 w-48 " />
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>

    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-9 mt-2 ">
        <div className=" col-span-2" >
            <div className="p-2 m-2">
                <i className="font-medium ">Select the Ingredient type <GiChoice className="inline"></GiChoice> </i>
                <SelectionList value={typeSelection} onClick={(option)=>setTypeSelection(option)}></SelectionList>
            </div>
        </div>
        <div className="col-span-2" >
        <div className="p-2 m-2">
            <i className="font-medium ">Select your Ingredient Name</i>
                <AddList selection={typeSelection} added={ingredientArray} onClick={handleAddition}></AddList>
            </div>
        </div>

        <div className=" col-span-2" >
            <div className="p-2 m-2">
            <i className="font-medium ">Currently you have:</i>
            <AddedList listToRender={ingredientArray} listNotToRender={excludedIngredientArray} onClick={handleDeletion}></AddedList>
            </div>
        </div>

        <div className=" col-span-2 sm:col-span-4 lg:col-span-3 xl:col-span-3" >
            <div className="p-2 m-2">
            <i className="font-medium ">You can make:</i>
            <PossibilityList drinks={possibleDrinksData}></PossibilityList>
            </div>
        </div>
        
        </div>
        <div className=" mt-4 mb-4 ml-4">
        <h3 className="text-lg font-bold text-sky-800"> Try these?</h3>
        <TryList drinks={selectedDrinks} />
        </div>
    </div>
    );
}

export default Builder;