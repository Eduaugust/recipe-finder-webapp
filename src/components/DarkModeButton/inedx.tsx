import React from 'react';
import { Button } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useDarkMode } from '../../contexts/DarkModeContext';

const DarkModeButton: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button
      type="text"
      icon={isDarkMode ? <BulbFilled /> : <BulbOutlined />}
      onClick={toggleDarkMode}
    >
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default DarkModeButton;