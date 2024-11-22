import { Input, Slider } from "antd";

const Filter = ({
  defaultFilterValues,
  handleFilterChange,
  setPriceRange,
  priceRange,
}) => {
  const handlePriceInputChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="sidebar">
      <h3>Filters</h3>
      {Object.entries(defaultFilterValues).map(([key, values]) => (
        <div key={key}>
          <h4>{key}</h4>
          <Slider
            range
            min={values[0]}
            max={values[1]}
            defaultValue={values}
            onChange={(values) => handleFilterChange(key, values)}
          />
        </div>
      ))}
      <h3>Price Range</h3>
      <div className="price-range">
        <Input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={priceRange.minPrice}
          onChange={handlePriceInputChange}
        />
        {"-"}
        <Input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={priceRange.maxPrice}
          onChange={handlePriceInputChange}
        />
      </div>
    </div>
  );
};

export default Filter;
