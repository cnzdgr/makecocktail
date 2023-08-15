//Handles the added ingredient display and deletion on
//"Currently you have" part 
//At cocktail builder page

import { RiDeleteBin4Line } from 'react-icons/ri';

function AddedList({ listToRender, onClick }) {
    const handleDeleteClick = (option) => {
        onClick(option);
    }

    const renderedOptions = listToRender.map((option) => {
        let notAdded = true;
 
          return(
            <div  key={option} 
                  onClick={() => handleDeleteClick(option)}
                  className="grid grid-cols-7 hover:bg-red-100 hover:line-through	 cursor-pointer">
            <div className={"rounded p2 col-span-6 capitalize	"}>
                <p>{option.replace(/_/g, ' ')}</p>
            </div>
              {notAdded && <div className="">
                 <RiDeleteBin4Line 
                      className=" text-lg"
                      key={option}
                      />
                </div>}
            </div>
          );
        }
      );
    let isEmpty = (renderedOptions.length === 0);

      return(
          <div className="mt-2">
            {isEmpty && <h2 className="text-sm">Add some ingredients to see delicious recipes!</h2>}
            {isEmpty || <div className="max-w-sm rounded overflow-hidden shadow-lg">{renderedOptions}</div>}
          </div>
      );
}

export default AddedList;