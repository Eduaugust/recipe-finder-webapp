import React from 'react';
import { Col, Row, Typography } from 'antd'
import DarkModeButton from '../../components/DarkModeButton/inedx';

const Header: React.FC = () => {
  return (
    <Row className='w-full'>
      <Col span={16}>
        <Typography.Title level={2} className="text-3xl font-bold mb-2 ">Recipes Page</Typography.Title>
        <Typography.Paragraph className="text-lg">Discover and save your favorite recipes from a wide variety of cuisines</Typography.Paragraph>
      </Col>
      <Col span={8} className="flex mt-4 justify-end">
        <DarkModeButton />
      </Col>
    </Row>
  );
};

export default Header;

