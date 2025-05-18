import { useState, useEffect } from 'react';
import { Box, Typography, Slider, Checkbox, FormControlLabel, Collapse, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchBrands, setFilters } from '../../features/products/productsSlice';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const ProductFilters = () => {
  const dispatch = useDispatch();
  const { categories, brands, filters } = useSelector(state => state.products);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [expandedCategories, setExpandedCategories] = useState(true);
  const [expandedBrands, setExpandedBrands] = useState(true);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    if (filters.price_min || filters.price_max) {
      setPriceRange([
        filters.price_min || 0,
        filters.price_max || 10000
      ]);
    }
  }, [filters]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceCommit = (event, newValue) => {
    dispatch(setFilters({
      price_min: newValue[0],
      price_max: newValue[1]
    }));
  };

  const handleCategoryChange = (categoryId) => {
    const newCategories = filters.categories?.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...(filters.categories || []), categoryId];
    
    dispatch(setFilters({ categories: newCategories }));
  };

  const handleBrandChange = (brandId) => {
    const newBrands = filters.brands?.includes(brandId)
      ? filters.brands.filter(id => id !== brandId)
      : [...(filters.brands || []), brandId];
    
    dispatch(setFilters({ brands: newBrands }));
  };

  const clearFilters = () => {
    dispatch(setFilters({
      categories: [],
      brands: [],
      price_min: null,
      price_max: null
    }));
    setPriceRange([0, 10000]);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6">Filtros</Typography>
        <Button size="small" onClick={clearFilters}>
          Limpiar
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>Rango de Precio</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          onChangeCommitted={handlePriceCommit}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
          step={100}
          valueLabelFormat={(value) => `$${value}`}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">${priceRange[0]}</Typography>
          <Typography variant="body2">${priceRange[1]}</Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
          onClick={() => setExpandedCategories(!expandedCategories)}
          sx={{ cursor: 'pointer' }}
        >
          <Typography>Categorías</Typography>
          {expandedCategories ? <ExpandLess /> : <ExpandMore />}
        </Box>
        <Collapse in={expandedCategories}>
          <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
            {categories.map((category) => (
              <FormControlLabel
                key={category.id}
                control={
                  <Checkbox
                    checked={filters.categories?.includes(category.id) || false}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                }
                label={category.name}
              />
            ))}
          </Box>
        </Collapse>
      </Box>

      <Box>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
          onClick={() => setExpandedBrands(!expandedBrands)}
          sx={{ cursor: 'pointer' }}
        >
          <Typography>Marcas</Typography>
          {expandedBrands ? <ExpandLess /> : <ExpandMore />}
        </Box>
        <Collapse in={expandedBrands}>
          <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
            {brands.map((brand) => (
              <FormControlLabel
                key={brand.id}
                control={
                  <Checkbox
                    checked={filters.brands?.includes(brand.id) || false}
                    onChange={() => handleBrandChange(brand.id)}
                  />
                }
                label={brand.name}
              />
            ))}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default ProductFilters;