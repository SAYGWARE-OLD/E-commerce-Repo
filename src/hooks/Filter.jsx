import { Input, Slider } from "antd";

const Filter = ({ filterValues, handleFilterChange, setPriceRange, priceRange, filters }) => {

  const handlePriceInputChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="sidebar">
      <h3>Filters</h3>
      {filters.map(({ key, label }) => (
        <div key={key}>
          <h4>{label}</h4>
          <Slider
            range
            min={0}
            max={10}
            defaultValue={filterValues[key]}
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
