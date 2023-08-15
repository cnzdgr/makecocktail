import _ from 'lodash';
import { Link } from 'react-router-dom';

function Card({ drink }) {

	const renderedTags = drink.tags.map((tag) => {
		return (<i key={tag} className="mr-2">#{_.replace(_.startCase(tag)," ", "")} </i>);
	});

	return (
		<div className="flex flex-col justify-center m-1 hover:-translate-y-1">
			<Link to={"/all/" + drink.name.replace(/\s+/g, '-').toLowerCase()}>
			
				<div className="relative p-4 m mx-auto border border-white bg-white">
					<div className="w-full p-1 lg:p-2  bg-white">
						<img src={drink.logo} alt="the cocktail" className="rounded-md drop-shadow-md " />
					</div>
					<div className=" bg-white flex flex-col space-y-1 p-2">

						<h3 className="font-black text-gray-800 md:text-lg text-ls mt-3 ">{drink.name}</h3>
						<p className="md:text-base text-gray-500 text-base ">{drink.description}</p>
						<p className="text-sm font-gray text-gray-700 mt-2">
							{renderedTags}
						</p>
					</div>
				</div>
			</Link>
		</div>
		)};

    export default Card;