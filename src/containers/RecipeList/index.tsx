import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Card, Col, Empty, Row, Typography } from 'antd';
import React from 'react';
import { RecipeType } from '../../types/recipe';

const { Paragraph } = Typography;

type RecipeListType = {
  filteredData: RecipeType[],
  handleCardClick: (recipe: RecipeType) => void,
  favorites: string[],
  toggleFavorite: (title: string, event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

const RecipeList: React.FC<RecipeListType> = ({filteredData, handleCardClick, favorites, toggleFavorite}) => {
  return (
    <>
    {filteredData.length > 0 
      ? <Row gutter={[16, 16]} className="mt-4">
          {filteredData.map((recipe, index) => (
        <Col span={24} sm={filteredData.length > 1 ? 12 : 24} lg={filteredData.length === 2 ? 12 : filteredData.length > 1 ? 8 : 24 } key={index}>
          <Card
            hoverable
            cover={<img alt={recipe.title} src={recipe.recipeImage} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
            onClick={() => handleCardClick(recipe)}
            style={{ height: '100%' }}
            title={recipe.title}
            extra={[
          favorites.includes(recipe.title) ? 
          <HeartFilled className='text-yellow-500' onClick={(event) => toggleFavorite(recipe.title, event)} /> : 
          <HeartOutlined className='text-yellow-500' onClick={(event) => toggleFavorite(recipe.title, event)} />
            ]}
          >
            <Card.Meta 
          description={
            <Paragraph ellipsis={{ rows: 2 }}>
              {recipe.description}
            </Paragraph>
          } 
            />
          </Card>
        </Col>
          ))}
        </Row>
      : <Row className="w-full justify-center mt-4">
          <Empty className="" description="No recipes found" />
        </Row>
      }
      </>
  );
};

export default RecipeList;

