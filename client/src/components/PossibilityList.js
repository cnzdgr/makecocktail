import { Link } from "react-router-dom";
import ReducedCard from './ReducedCard';

function PossibilityList({ drinks }) {

    const renderedPossibilities= drinks.map((drink) => {
        return(
            <div className="rounded overflow-hidden  col ">
            <ReducedCard key={drink.name} drink={drink}></ReducedCard>    
            </div>
        );
    });
    let isEmpty = (renderedPossibilities.length === 0);

    return(
        <div className="mt-2">
            {isEmpty && <h3 className="text-sm">Add more ingredients for recipes.</h3>}
            {isEmpty && <h3 className="text-sm">Cannot find still? Go to our <Link className="font-medium italic text-sky-800" to="/all"> all cocktails page. </Link></h3>}
            <div className="  grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 ">
                {renderedPossibilities}
            </div>

        </div>

    );
}

export default PossibilityList;