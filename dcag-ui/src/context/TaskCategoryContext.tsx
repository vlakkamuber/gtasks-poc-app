import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

const TaskCategoryContext = createContext<useCategoryType | null>(null);

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [location, setLocation] = useState('OTHER');

  const value = {
    selectedCategory,
    setSelectedCategory,
    location,
    setLocation
  };
  // Add this inside your component, where you initialize state
  useEffect(() => {
    // Retrieve the selected category from localStorage
    const storedCategory = localStorage.getItem('selectedCategory');
    const storedLocation = localStorage.getItem('location');

    // If a category is stored in localStorage, set it in the state
    if (storedCategory) {
      setSelectedCategory(storedCategory);
    }
    if (storedLocation) {
      setLocation(storedLocation); // Set location from localStorage
    }
  }, []); // The empty dependency array ensures this effect runs only once, similar to componentDidMount

  return <TaskCategoryContext.Provider value={value}>{children}</TaskCategoryContext.Provider>;
};

type useCategoryType = {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

export const useCategory = () => {
  const context = useContext(TaskCategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
