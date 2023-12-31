import React from 'react'
import { useRouter } from 'next/router'
function TemplateDetail() {
    const router = useRouter()
    const { slug } = router.query
    return (
      <>

        <div className="container mx-auto">
          { slug }
        </div>


<section>
    <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
      <div>
        <h1 className="text-2xl font-bold lg:text-3xl">
          Simple Clothes Basic Tee
        </h1>
        <p className="mt-1 text-sm text-gray-500">SKU: #012345</p>
      </div>
      <div className="grid gap-8 lg:items-start lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="relative mt-4">
            <img
              alt=""
              src="https://placeimg.com/640/480/any"
              className="w-full rounded-xl h-72 lg:h-[540px] object-cover"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/75 text-white px-3 py-1.5 inline-flex items-center">
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
              <span className="text-xs ml-1.5">Hover to zoom</span>
            </div>
          </div>
          <ul className="flex gap-1 mt-1">
            <li>
              <img
                className="object-cover w-16 h-16 rounded-md"
                src="https://placeimg.com/640/480/any"
                alt=""
              />
            </li>
            <li>
              <img
                className="object-cover w-16 h-16 rounded-md"
                src="https://placeimg.com/640/480/any"
                alt=""
              />
            </li>
            <li>
              <img
                className="object-cover w-16 h-16 rounded-md"
                src="https://placeimg.com/640/480/any"
                alt=""
              />
            </li>
            <li>
              <img
                className="object-cover w-16 h-16 rounded-md"
                src="https://placeimg.com/640/480/any"
                alt=""
              />
            </li>
          </ul>
        </div>
        <div className="lg:top-0 lg:sticky">
          <form className="space-y-4 lg:pt-8">
            <fieldset>
              <legend className="text-lg font-bold">Color</legend>
              <div className="flex mt-2 space-x-1">
                <label htmlFor="color_green" className="cursor-pointer">
                  <input
                    type="radio"
                    id="color_green"
                    name="color"
                    className="sr-only peer"
                    defaultChecked=""
                  />
                  <span className="block w-6 h-6 bg-green-700 border border-gray-200 rounded-full ring-1 ring-offset-1 ring-transparent peer-checked:ring-gray-300" />
                </label>
                <label htmlFor="color_blue" className="cursor-pointer">
                  <input
                    type="radio"
                    id="color_blue"
                    name="color"
                    className="sr-only peer"
                  />
                  <span className="block w-6 h-6 bg-blue-700 border border-gray-200 rounded-full ring-1 ring-offset-1 ring-transparent peer-checked:ring-gray-300" />
                </label>
                <label htmlFor="color_pink" className="cursor-pointer">
                  <input
                    type="radio"
                    id="color_pink"
                    name="color"
                    className="sr-only peer"
                  />
                  <span className="block w-6 h-6 bg-pink-700 border border-gray-200 rounded-full ring-1 ring-offset-1 ring-transparent peer-checked:ring-gray-300" />
                </label>
                <label htmlFor="color_red" className="cursor-pointer">
                  <input
                    type="radio"
                    id="color_red"
                    name="color"
                    className="sr-only peer"
                  />
                  <span className="block w-6 h-6 bg-red-700 border border-gray-200 rounded-full ring-1 ring-offset-1 ring-transparent peer-checked:ring-gray-300" />
                </label>
                <label htmlFor="color_indigo" className="cursor-pointer">
                  <input
                    type="radio"
                    id="color_indigo"
                    name="color"
                    className="sr-only peer"
                  />
                  <span className="block w-6 h-6 bg-indigo-700 border border-gray-200 rounded-full ring-1 ring-offset-1 ring-transparent peer-checked:ring-gray-300" />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-lg font-bold">Material</legend>
              <div className="flex mt-2 space-x-1">
                <label htmlFor="material_cotton" className="cursor-pointer">
                  <input
                    type="radio"
                    id="material_cotton"
                    name="material"
                    className="sr-only peer"
                    defaultChecked=""
                  />
                  <span className="block px-3 py-1 text-xs border border-gray-200 rounded-full peer-checked:bg-gray-100">
                    Cotton
                  </span>
                </label>
                <label htmlFor="material_wool" className="cursor-pointer">
                  <input
                    type="radio"
                    id="material_wool"
                    name="material"
                    className="sr-only peer"
                    defaultChecked=""
                  />
                  <span className="block px-3 py-1 text-xs border border-gray-200 rounded-full peer-checked:bg-gray-100">
                    Wool
                  </span>
                </label>
              </div>
            </fieldset>
            <div className="p-4 bg-gray-100 border rounded">
              <p className="text-sm">
                <span className="block">Pay as low as $3/mo with 0% APR.</span>
                <a href="" className="inline-block mt-1 underline">
                  Find out more
                </a>
              </p>
            </div>
            <div>
              <p className="text-xl font-bold">$19.99</p>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-bold tracking-wide text-white uppercase btn btn-primary rounded"
            >
              Add to cart
            </button>
            <button
              type="button"
              className="w-full px-6 py-3 text-sm font-bold tracking-wide uppercase bg-gray-100 border btn btn-primary  rounded"
            >
              Notify when on sale
            </button>
          </form>
        </div>
        <div className="lg:col-span-3">
          <div className="prose max-w-none">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem ad
              labore nostrum, a explicabo iste est dolorem deserunt id ullam
              magni accusamus saepe, nulla sed sint reiciendis, aperiam cumque
              officiis!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
              eveniet ipsam mollitia nesciunt illo! Suscipit, corrupti!
            </p>
            <h3>Features</h3>
            <ul>
              <li>Smooth neck design</li>
              <li>Breathable fabric</li>
              <li>Odour prevention</li>
              <li>Made from recycled materials</li>
            </ul>
            <iframe
              src="https://www.youtube-nocookie.com/embed/Eb-Vfe61W6A?controls=0"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen=""
            />
          </div>
        </div>
      </div>
    </div>
  </section>
      </>
     
 
    
      
    )
}

export default TemplateDetail

/*
https://www.hyperui.dev/components/ecommerce/products

*/