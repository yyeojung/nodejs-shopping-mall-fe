import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="card" onClick={() => showProduct(item._id)}>
      <img src={item?.image} alt={item?.image} />
      <div>{item?.name}</div>
      <div>₩ {(item?.price).toLocaleString()}</div>
    </div>
  );
};

export default ProductCard;
