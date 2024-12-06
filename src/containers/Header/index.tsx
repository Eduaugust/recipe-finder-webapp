import React from 'react';
import { Col, Row, Typography } from 'antd'
import DarkModeButton from '../../components/DarkModeButton/inedx';
import { useNavigate } from 'react-router';

const Header: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Row className='w-full'>
      <Col span={16}>
        <Typography.Title level={2} className="text-3xl font-bold mb-2 ">
          {window.location.pathname === '/' ? 'Recipes' : 'Favorites'} Page
        </Typography.Title>
        <Typography.Paragraph className="text-lg">Discover and save your favorite recipes from a wide variety of cuisines</Typography.Paragraph>
      </Col>
      <Col span={8} className="flex mt-4 justify-end">
        <Typography className='cursor-pointer pt-1 pr-2' onClick={() => navigate(window.location.pathname === '/' ? '/favorites' : '/')}>
          {window.location.pathname === '/' ? 'Go to Favorites' : 'Go to Recipes'}
        </Typography>
        <DarkModeButton />
      </Col>
    </Row>
  );
};

export default Header;

