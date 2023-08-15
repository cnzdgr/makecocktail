//Handles the ingredient selection display and adding on
//"Select your Ingredient Name" part 
//At cocktail builder page

import { MdOutlineLibraryAddCheck } from 'react-icons/md';
import {ingredients} from '../categoryData/IngredientArray';

function AddList({ selection, added, onClick }) {
    const handleAdditionClick = (option) => {
        onClick(option);
    }

    const renderedOptions = ingredients.map((option) => {
      let notAdded = true;
      if (option.parent === selection){
        if (added.includes(option.value)){
          notAdded = false;
        };
        return(
          <div  key={option.value}
                onClick={() => handleAdditionClick(option)}
                className="grid grid-cols-7 hover:bg-sky-50 cursor-pointer">
            <div className={"rounded p2 col-span-6"}>
                <p>{option.label}</p>
            </div>
            {notAdded && <div>
               <MdOutlineLibraryAddCheck 
                    className="text-lg fill-gray-900"          
                    key={option.value}
                    />
            </div>}
          </div>
        );
      } else {
        return null;
      };
    });

    return(
        <div className="mt-2">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">{renderedOptions}</div>
        </div>
    );
}

export default AddList;