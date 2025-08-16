import { useEffect, useState } from "react";

export default function RecentProducts({ productList }) {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const recentIds = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
    );
    const filtered = recentIds
      .map((id) => productList.find((item) => item._id === id))
      .filter((item) => !!item);

    setRecentProducts(filtered);
  }, [productList]);

  if (recentProducts.length === 0) return null;
  return (
    <div className="recent-product">
      <p>최근 본 상품</p>
      <ul className="recent-item">
        {recentProducts.map((item) => (
          <li key={item._id}>
            <a href={`/product/${item._id}`}>
              <img src={item.image} alt={item.name} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
