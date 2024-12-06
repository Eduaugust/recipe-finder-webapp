import { Col, Row, Select } from 'antd';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ReceipeType } from '../../types/recipe';
const { Option } = Select;

type FilterProps = {
  recipeIngredients: string[],
  mockData: ReceipeType[],
  filteredData: ReceipeType[],
  setFilteredData: Dispatch<SetStateAction<ReceipeType[]>>
}

const Filter: React.FC<FilterProps> = ({recipeIngredients, mockData, filteredData, setFilteredData}) => {
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const [sortOrder, setSortOrder] = useState<string>('none');

  useEffect(() => {
    setOptions(recipeIngredients.map(ingredient => ({ value: ingredient })));
  }, [recipeIngredients]);

  const sortRecipes = (recipes: any[], order: string) => {
    if (order === 'none') {
      return recipes;
    } else if (order === 'alphabetical') {
      return [...recipes].sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === 'reverseAlphabetical') {
      return [...recipes].sort((a, b) => b.title.localeCompare(a.title));
    } else if (order === 'ingredients') {
      return [...recipes].sort((a, b) => a.ingredients.length - b.ingredients.length);
    } else if (order === 'reverseIngredients') {
      return [...recipes].sort((a, b) => b.ingredients.length - a.ingredients.length);
    }
    return recipes;
  };
  
  const handleSortChange = (value: string) => {
    setSortOrder(value);
    setFilteredData(sortRecipes(filteredData, value));
  };

  const handleSearch = (value: string) => {
    const filtered = recipeIngredients.filter((ingredient: string) =>
      ingredient.toLowerCase().includes(value.toLowerCase())
    );
    setOptions(filtered.map(ingredient => ({ value: ingredient })));
  };

  const handleChange = (value: string[]) => {
    let filtered = mockData;
    if (value.length > 0) {
      filtered = mockData.filter(recipe =>
        value.some(ingredient =>
          recipe.ingredients.some(recipeIngredient =>
            recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
          )
        )
      );
    }
    setFilteredData(sortRecipes(filtered, sortOrder));
    console.log(filtered);
  };


  return (
    <Row className='flex w-full'>
      <Col span={24} md={16}>
        <Select
          mode="multiple"
          allowClear
          className="flex"
          onSearch={handleSearch}
          onChange={handleChange}
          placeholder="Search recipes"
          style={{ width: '100%' }}
          options={options}
        >
          {options.map(option => (
        <Option key={option.value} value={option.value}>
          {option.value}
        </Option>
          ))}
        </Select>
      </Col>
      <Col span={24} md={{span: 6, offset: 2}} className="flex mb-4 justify-end">
        <Select
          placeholder="Sort by"
          onChange={handleSortChange}
          className='w-[100%]'
        >
          <Option value="alphabetical">(A-Z) Alphabetical Order</Option>
          <Option value="reverseAlphabetical">(Z-A) Alphabetical Order</Option>
          <Option value="ingredients">(Fewest to Most) Ingredients</Option>
          <Option value="reverseIngredients">(Most to Fewest) Ingredients</Option>
        </Select>
      </Col>
    </Row>
  );
};

export default Filter;
