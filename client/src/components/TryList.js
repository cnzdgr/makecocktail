
import Card from '../components/Card';

function TryList({ drinks }) {

    const renderedDrinks = drinks.map((drink) => {
        return (
                <div key={drink.name} className="rounded overflow-hidden shadow-lg col">
                    <Card drink={drink}></Card>
                </div>
                );
            });
            
    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-">
            <div className="p-1 grid grid-cols-8 sm:grid-cols-11 md:grid-cols-11 lg:grid-cols-11 xl:grid-cols-11 gap-5">
                <div className="m-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 col-span-8 m-2">
                    {renderedDrinks}
                </div>
            </div>
        </div>


    );
}

export default TryList;