// Mini version of the Cocktail Card
// To be used in "You can make" part

import _ from 'lodash';
import { Link } from 'react-router-dom';

function ReducedCard({ drink }) {

	const renderedTags = drink.tags.map((tag) => {
		return (<i key={tag} className="mr-2">#{_.replace(_.startCase(tag)," ", "")} </i>);
	});

	return (
		<div className="flex flex-col justify-center m-1">
			<Link to={"/all/" + drink.name.replace(/\s+/g, '-').toLowerCase()}>
			
				<div className="relative flex flex-col p-1 m mx-auto border border-white bg-white object-contain w-24">
					<div className="w-full bg-white place-content-center">
						<img src={drink.logo} alt={drink.logo} className="rounded-xl  " />
					</div>
					<div className=" bg-white flex flex-col space-y-1 p-2 ">

						<h3 className="font-black text-gray-800 text-base  mt-3 ">{drink.name}</h3>
						<p className="text-sm font-gray text-gray-700 mt-2">
							{renderedTags}
						</p>
					</div>
				</div>
			</Link>
		</div>
		)};

    export default ReducedCard;