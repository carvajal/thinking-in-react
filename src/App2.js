import { useState } from "react";

function SearchBar({
  searchTerm,
  setSearchTerm,
  onlyStockedChecked,
  setOnlyStockedChecked,
}) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={{ marginTop: "5px", display: "flex" }}>
        <input
          type="checkbox"
          checked={onlyStockedChecked}
          onChange={(e) => setOnlyStockedChecked(e.target.checked)}
        />
        <label>Only show products in stock</label>
      </div>
    </div>
  );
}

function ProductRow({ product }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        marginBottom: "-5px",
      }}
    >
      <label style={{ color: product.stocked ? "black" : "red" }}>
        {product.name}
      </label>
      <label>{product.price}</label>
    </div>
  );
}

function CategoryRow({ category, products }) {
  const productRows = products.map((product) => {
    return <ProductRow key={product.name} product={product} />;
  });
  return (
    <div>
      <label style={{ textAlign: "center", fontWeight: "bold" }}>
        {category}
      </label>
      {productRows}
    </div>
  );
}

function ProductTable({ products }) {
  const categories = {};
  for (let product of products) {
    if (!(product.category in categories)) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  }
  const categoryRows = Object.keys(categories).map((key) => {
    return <CategoryRow key={key} category={key} products={categories[key]} />;
  });
  return (
    <div style={{ width: "150px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <label style={{ textAlign: "center", fontWeight: "bold" }}>Name</label>
        <label style={{ textAlign: "center", fontWeight: "bold" }}>Price</label>
      </div>
      {categoryRows}
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App2() {
  const [searchTerm, setSearchTerm] = useState("");
  const [onlyStockedChecked, setOnlyStockedChecked] = useState(false);
  let filteredProducts = PRODUCTS;
  if (searchTerm) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.includes(searchTerm)
    );
  }
  if (onlyStockedChecked) {
    filteredProducts = filteredProducts.filter((p) => p.stocked);
  }
  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onlyStockedChecked={onlyStockedChecked}
        setOnlyStockedChecked={setOnlyStockedChecked}
      />
      <ProductTable products={filteredProducts} />
    </>
  );
}
