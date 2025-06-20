import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPromptResponse } from "../../../features/prompt/promptSlice";
import EmailsModal from "./SendEmails";
import { getPromptResponseApi } from "../../../apis/promptApis";

export default function CategoriesForm({setShowSendEmailsComponent}) {
  const categoryOptions = [
    {
      id: "structureAndConstruction",
      name: "Structural & Construction Work",
      subcategories: [
        { id: "bricklayers", name: "Bricklayers" },
        {
          id: "concreteConstructors",
          name: "Concrete/Reinforced Concrete Constructors",
        },
        {
          id: "earthworksAndCivilEngineers",
          name: "Earthworks and Civil Engineers",
        },
        { id: "drywallers", name: "Drywallers" },
        { id: "scaffolders", name: "Scaffolders" },
        { id: "buildingDemolition", name: "Building Demolition" },
      ],
    },
    {
      id: "roofAndFasade",
      name: "Roof & Fasade",
      subcategories: [
        { id: "roofers", name: "Roofers" },
        { id: "carpenters", name: "Carpenters/Timber Constructors" },
        { id: "plumbers", name: "Plumbers (roof drainage)" },
        { id: "facadeBuilders", name: "Facade Builders/ETICS" },
        { id: "skylightInstallers", name: "Skylight Installers" },
      ],
    },
    {
      id: "technologyAndBuildingServices",
      name: "Technology & Building Services",
      subcategories: [
        { id: "electricalInstallers", name: "Electrical Installers" },
        {
          id: "heatingTechnologyInstallers",
          name: "Heating Technology Installers (gas, oil, heat pump)",
        },
        {
          id: "plumbersAndWaterInstallers",
          name: "Plumbers and Water Installers",
        },
        {
          id: "ventilatorAirConditionerRefrigeratorInstallers",
          name: "Ventilator , Air Conditioner , Refrigerator Installers",
        },
        {
          id: "photovoltaicsInstallers",
          name: "Photovoltaics / Solar Thermal Energy Installers",
        },
      ],
    },
    {
      id: "interiorFinishingServices",
      name: "Interior Finishing Services",
      subcategories: [
        { id: "paintersAndVarnishers", name: "Painters and Varnishers" },
        {
          id: "floorLayerers",
          name: "Floor Layerers (parquet, vinyl, carpet, etc.)",
        },
        { id: "tileLayerers", name: "Tile Layerers" },
        { id: "carpenters", name: "Carpenters/Joiners" },
        { id: "plasterers", name: "Plasterers" },
        { id: "windowAndDoorBuilders", name: "Window and Door Builders" },
        { id: "generalInteriorFinishers", name: "General Interior Finishers" },
      ],
    },
    {
      id: "specialTrades",
      name: "Special Trades",
      subcategories: [
        { id: "locksmiths", name: "Locksmiths/Metal Workers" },
        {
          id: "rollerShutter",
          name: "Roller Shutter and Sun Protection Technology",
        },
        { id: "glaziers", name: "Glaziers" },
        { id: "fireProtectionInstallers", name: "Fire Protection Installers" },
        { id: "elevatorConstructors", name: "Elevator Constructors" },
      ],
    },
  ];

  const locationOptions = [
    {
      id: "berlin",
      city: "Berlin"
    },
    {
      id: "bremen",
      city: "Bremen"
    },
    {
      id: "cologne",
      city: "Cologne"
    },
    {
      id: "dortmund",
      city: "Dortmund"
    },
    {
      id: "düsseldorf",
      city: "Düsseldorf"
    },
    {
      id: "hamburg",
      city: "Hamburg"
    },
    {
      id: "heidelberg",
      city: "Heidelberg"
    },
    {
      id: "frankfurt",
      city: "Frankfurt"
    },
    {
      id: "magdeburg",
      city: "Magdeburg"
    },
    {
      id: "munich",
      city: "Munich"
    },
    {
      id: "münster",
      city: "Münster"
    },
    {
      id: "pforzheim",
      city: "Pforzheim"
    },
    {
      id: "stuttgart",
      city: "Stuttgart"
    },
    {
      id: "trier",
      city: "Trier"
    },
  ]

  const numberOfResponsesOptions = [
    {
      id: "1x",
      response: "1x",
    },
    {
      id: "2x",
      response: "2x",
    },
    {
      id: "3x",
      response: "3x",
    },
  ]
  
  const [selectedSubcategories, setSelectedSubcategories] = React.useState([]);
  const [selectedLocations, setSelectedLocations] = React.useState([]);
  const [excludeChamberOfGermanyCompanines, setExcludeChamberOfGermanyCompanies] = React.useState(false);
  const [numberOfResponses, setNumberOfResponses] = React.useState(numberOfResponsesOptions[0]?.id);
  const dispatch = useDispatch();
  const {authToken} = useSelector((state) => state.auth);
  // const {loading, totalEmails, error} = useSelector((state) => state.prompt);

  const toggleSubcategory = (subcategoryName) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategoryName)
        ? prev.filter((id) => id !== subcategoryName)
        : [...prev, subcategoryName]
    );
  };

  const toggleLocation = (city) => {
    setSelectedLocations(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setLoading(true);
    setShowSendEmailsComponent(true);

    const promptResponsePayload = { categories: selectedSubcategories, locations: selectedLocations, excludeChamberOfGermanyCompanines, numberOfResponses };
    try {
      // dispatch(getPromptResponse(promptResponsePayload, authToken));
      console.log(promptResponsePayload, "prompt res");
      dispatch(getPromptResponse(promptResponsePayload));
    } catch (error) {
      // toast.error('Error updating companion profile details: ' + err.message);
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1000px] mx-auto bg-white p-8 rounded-lg shadow">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">
          Get Started
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-12">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Categories
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("categoriesDropdown")
                      ?.classList.toggle("hidden")
                  }
                  className="w-full flex justify-between items-center px-6 py-3 bg-gradient-to-br from-gray-300 to-gray-600 text-white font-bold rounded-xl shadow-lg transform transition hover:translate-y-[-2px] hover:shadow-2xl"
                >
                  <span className="flex items-center">
                    Select Categories
                  </span>
                  <span className="text-xl">▼</span>
                </button>
                <div
                  id="categoriesDropdown"
                  className="hidden mt-2 bg-white rounded-lg shadow-lg divide-y divide-gray-200 z-10 absolute w-full"
                >
                  {categoryOptions.map((category) => (
                    <div
                      key={category.id}
                      className="p-3 border-b last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={(e) =>
                          e.currentTarget.nextElementSibling?.classList.toggle(
                            "hidden"
                          )
                        }
                        className="w-full flex justify-between items-center text-gray-600 font-medium"
                      >
                        <span className="flex items-center">
                          <span className="mr-2">&gt;</span>
                          {category.name}
                        </span>
                        <span className="transform transition">▼</span>
                      </button>
                      <div className="hidden mt-3 grid grid-cols-2 gap-3">
                        {category.subcategories.map((sub) => {
                          const selected = selectedSubcategories.includes(sub.name);
                          return (
                            <div
                              key={sub.id}
                              onClick={() => toggleSubcategory(sub.name)}
                              className={`p-2 rounded-lg border ${
                                selected
                                  ? "bg-gray-600 border-gray-700 text-white"
                                  : "bg-white border-gray-200"
                              } shadow transform transition hover:scale-105 cursor-pointer flex justify-between items-center`}
                            >
                              <span
                                className={`font-medium ${
                                  selected ? "text-white" : ""
                                }`}
                              >
                                {sub.name}
                              </span>
                              {selected && <span className="font-bold">✓</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedSubcategories.length > 0 && (
                <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-semibold">
                      Selected Categories:
                    </span>
                    <span className="bg-gray-600 text-white rounded-full px-2 py-0.5 text-sm">
                      {selectedSubcategories.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubcategories.map((subName) => {
                      // const info = categoryOptions
                      //   .flatMap((c) => c.subcategories)
                      //   .find((s) => s.name === subName);
                      const cat = categoryOptions.find((c) =>
                        c.subcategories.some((s) => s.name === subName)
                      );

                      if (!cat) return null;
                      return (
                        <div
                          key={subName}
                          className="flex items-center bg-white border border-gray-600 rounded-full px-3 py-1 text-gray-600"
                        >
                          <span>
                            {cat.name} - {subName}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleSubcategory(subName)}
                            className="ml-2 font-bold"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Locations</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => document.getElementById("locationsDropdown")?.classList.toggle("hidden")}
                  className="w-full flex justify-between items-center px-6 py-3 bg-gradient-to-br from-gray-300 to-gray-600 text-white font-bold rounded-xl shadow-lg transition hover:-translate-y-1"
                >
                  <span>Select Locations</span>
                  <span className="text-xl">▼</span>
                </button>
                <div
                  id="locationsDropdown"
                  className="hidden mt-2 bg-white rounded-lg shadow-lg divide-y divide-gray-200 z-10 absolute w-full p-4 grid grid-cols-3 gap-3 max-h-60 overflow-auto"
                >
                  {locationOptions.map(loc => {
                    const selectedLocation = selectedLocations.includes(loc.city);
                    return (
                      <div
                        key={loc.id}
                        onClick={() => toggleLocation(loc.city)}
                        className={`p-2 rounded-lg border shadow cursor-pointer flex justify-between items-center transition hover:scale-105 ${
                          selectedLocation
                            ? "bg-gray-600 border-gray-700 text-white"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <span className={`font-medium ${selectedLocation ? "text-white" : ""}`}>{loc.city}</span>
                        {selectedLocation && <span className="font-bold">✓</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
              {selectedLocations.length > 0 && (
                <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-semibold">Selected Locations:</span>
                    <span className="bg-gray-600 text-white rounded-full px-2 py-0.5 text-sm">
                      {selectedLocations.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedLocations.map(city => (
                      <div
                        key={city}
                        className="flex items-center bg-white border border-gray-600 rounded-full px-3 py-1 text-gray-600"
                      >
                        <span>{city}</span>
                        <button
                          type="button"
                          onClick={() => toggleLocation(city)}
                          className="ml-2 font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* <div className="flex justify-between gap-12">
            <div className="">
              <label className="text-gray-600 font-semibold flex gap-2">
                <input 
                  type="checkbox" 
                  name="excludeChamberOfGermanyCompanines" 
                  value={excludeChamberOfGermanyCompanines}
                  placeholder=""
                  className="text-xl cursor-pointer"
                  onChange={() => setExcludeChamberOfGermanyCompanies((prevValue) => !prevValue)}
                />
                Exclude companies registered with Chamber of Germany.
              </label>
            </div>
          </div> */}

          <div className="flex flex-col gap-2">
            <span className="text-gray-800">Select Number of Responses</span>
            <div className="flex flex-wrap gap-4">
              {numberOfResponsesOptions.map(option => (
                <button 
                  key={option?.id}
                  type="button"
                  onClick={() => setNumberOfResponses(option?.id)}
                  className={`py-2 px-6 rounded-lg border shadow cursor-pointer flex justify-between items-center transition hover:scale-105 ${
                          option?.id === numberOfResponses
                            ? "bg-gray-600 border-gray-700 text-white"
                            : "bg-white border-gray-200"
                        }`}
                >
                  {option?.response}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!selectedSubcategories.length || !selectedLocations.length}
            className="px-4 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-850 transition duration-300 focus:outline-none focus:ring focus:ring-gray-800 font-medium disabled:opacity-50 cursor-pointer hover:scale-105"
          >
            Generate Results
          </button>
        </form>
      </div>
    </div>
  );
}
