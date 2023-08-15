import { Link } from "react-router-dom";

function HomePage() {
    return (
        <section class="bg-white">
            <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12">
                <div class="mr-auto place-self-center lg:col-span-7">
                    <h1 class="ml-4 text-blue-800 max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">
                        Your Hub for Easy Cocktail Recipes 
                    </h1>
                    <p class="ml-4 max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl text-gray-900">
                        We provide recipes that are easy to make, and only with ingredients in your home!
                    </p>
                    <div className="grid grid-cols-5 ">
                    <Link to={"builder"} className="scale-75 sm:scale-100 col-span-2">
                    <div className="relative flex flex-col p-1 m mx-auto border border-white bg-white object-contain w-48 h hover:-translate-y-1 hover:ring-1 ring-slate-500 text-sky-700 font-semibold	">
					        <div className="w-full bg-white place-content-center ">
						        <img src="https://i.ibb.co/FqXBkGy/cocktail-builder.pngs" alt="cocktail making "className="rounded-xl  " />
					        </div>
					        <div className=" bg-white text-lg flex flex-col justify-center space-y-1 p-2 ">
						    Mix with What You Have
                            </div>
                        </div>
                    </Link> 
                    
                    <Link to={"/all"} className="scale-75 sm:scale-100 col-span-2">
                        <div className="relative flex flex-col p-1 m mx-auto border border-white bg-white object-contain w-48 h hover:-translate-y-1 hover:ring-1 ring-slate-500 text-sky-700 font-semibold	">
					        <div className="w-full bg-white place-content-center">
						        <img src="https://i.ibb.co/HFY7Jz3/garden-bar.png" alt="cocktail making "className="rounded-xl  " />
					        </div>
					        <div className=" bg-white text-lg flex justify-center flex-col space-y-1 p-2 ">
						    See all cocktails
                            </div>
                        </div>
                    </Link> 
                    </div>

                </div>
                <div class="hidden lg:mt-0 lg:col-span-5 lg:flex scale-75">
                    <img src="https://i.ibb.co/CbnDYSX/main-pic.png" alt="mockup"/>
                </div>                
            </div>
        </section>

    );
}

export default HomePage