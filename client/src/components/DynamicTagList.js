import { useState } from 'react';
import { allIngredientArray } from "../categoryData/IngredientArray";
import { RiDeleteBin2Fill } from 'react-icons/ri';


function DynamicTagList({fieldName, onChange}) {

    const renderedOptions = allIngredientArray.map((option) => {
        return(
            <option
            className={"rounded capitalize"}
                value={option}
                key={option}>
            {option.replace(/_/g, ' ')}
            </option>
        );
    });

  const [formFields, setFormFields] = useState([
    { name: '' },
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
    onChange(data);
  }


  const addFields = (e) => {
    e.preventDefault();
    let object = {
      name: ''
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (event, index) => {
    event.preventDefault();
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  return (
    <div>
        {formFields.map((form, index) => {
          return (
            <div className="grid grid-cols-4" key={index}>
                <div className="col-span-3">
                 <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                name='name'
                placeholder={fieldName}
                onChange={event => handleFormChange(event, index)}
                value={form.name}>
                    {renderedOptions}
                </select>
                </div>
                <div className="p-3">
                  <RiDeleteBin2Fill 
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" 
                  aria-hidden="true"
                  onClick={(event) => removeFields(event, index)}
                   />
                </div>
            </div>
          )
        })
      }
      <button className="text-indigo-500 group-hover:text-indigo-400" onClick={addFields}>Add More..</button>
      <br />
    </div>
  );
}

export default DynamicTagList;

