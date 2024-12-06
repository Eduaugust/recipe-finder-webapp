import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import React from 'react';
import { capitalizeFirstLetter } from '../../formatter';
import { RecipeType } from '../../types/recipe';

const { Title, Paragraph, Text } = Typography;

type ModalDetailProps = {
  handleModalClose: VoidFunction,
  favorites: String[],
  selectedRecipe: RecipeType,
  toggleFavorite: (title: string) => void
}
const ModalDetail: React.FC<ModalDetailProps> = ({handleModalClose, favorites, selectedRecipe, toggleFavorite}) => {
  return (
    <Modal
        title={
        <Row className='flex items-center'>
      <Button
        type="text"
        className='ml-12 mr-4'
        icon={favorites.includes(selectedRecipe.title) 
          ? <HeartFilled size={24} width={24} className='text-yellow-500 ' /> 
          : <HeartOutlined className='text-yellow-500' />
        }
        onClick={() => toggleFavorite(selectedRecipe.title)}
      />
      <Title 
        style={{ margin: 0 }}
        level={2}>
        {selectedRecipe.title}
      </Title>
        </Row>
        }
        open={true}
        onCancel={handleModalClose}
        footer={null}
        width={900}
        styles={{body: {padding: '24px'}}}
        className='top-5'
      >
      <div className="text-center mb-4">
        <img
        alt={selectedRecipe.title}
        src={selectedRecipe.recipeImage}
        className="aspect-video rounded-lg shadow-md mb-4 object-cover w-[90%] mx-auto"
        />
      </div>
        <Row gutter={[16, 16]}>
      <Col sm={24} md={12} lg={12}>
        <Divider orientation="left">Ingredients</Divider>
        <Paragraph>
      <ul style={{ paddingLeft: '20px' }}>
        {selectedRecipe.ingredients.map((ingredient: string, index: number) => (
      <li key={index}>
        <Text>
          {capitalizeFirstLetter(ingredient)}
        </Text>
      </li>
        ))}
      </ul>
        </Paragraph>
      </Col>
      <Col sm={24} md={12} lg={12}>
        <Divider orientation="left">Instructions</Divider>
      <Paragraph className='text-justify w-[80%]'>
        <Text>{selectedRecipe.instructions}</Text>
      </Paragraph>
      </Col>
        </Row>
    </Modal>
  );
};

export default ModalDetail;
