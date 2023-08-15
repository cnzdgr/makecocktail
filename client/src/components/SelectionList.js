import {options} from '../categoryData/IngredientArray';
import { AiOutlineRight } from 'react-icons/ai';


function SelectionList({ value, onClick }) {
    const handleSelectionClick = (option) => {
        onClick(option);
    }

    const renderedOptions = options.map((option) => {
        return(
            <div
                className={option.value === value ? "cursor-pointer shadow-md underline ml-1 grid grid-cols-8" : "cursor-pointer hover:underline ml-1 grid grid-cols-8"}

                onClick={() => handleSelectionClick(option.value)}
                key={option.value}>
                <h2 className="col-span-7"> {option.label}  </h2>
                <p className="col-span-1"> <AiOutlineRight className="inline"></AiOutlineRight> </p>
            </div>
        );
    });

    return(
        <div className="">
            <div className="max-w-sm rounded overflow-hidden shadow-lg mt-2 ">{renderedOptions}</div>
        </div>
    );
}

export default SelectionList;