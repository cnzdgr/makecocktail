import {filterOptions} from '../categoryData/IngredientArray';

function FilterList({ value, onClick }) {
    const handleSelectionClick = (option) => {
        onClick(option);
    }

    const renderedOptions = filterOptions.map((option) => {
        return(
            <div 
                className={option.value === value ? "bg-sky-100 rounded" : "hover:bg-sky-100 rounded cursor-pointer p2 w-full"}
                onClick={() => handleSelectionClick(option.value)}
                key={option.value}>
                <h2> {option.label} </h2>
            </div>
        );
    });

    return(
        <div className="relative p-1 ">
            <i className="text-sky-800 mb-2 font-semibold underline "> Filter by ingredient </i>
            <p className=" top-full grid grid-cols-2 ">{renderedOptions}</p>
        </div>
    );
}

export default FilterList;