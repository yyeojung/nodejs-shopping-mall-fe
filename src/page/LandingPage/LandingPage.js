import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/product/productSlice";
import ReactPaginate from "react-paginate";
import { ColorRing } from "react-loader-spinner";
import RecentProducts from "./components/RecentProducts";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productList, totalPageNum, loading } = useSelector(
    (state) => state.product
  );
  const [query] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    pageSize: 8,
    page: query.get("page") || 1,
    name: query.get("name") || "",
  }); //검색 조건들을 저장하는 객체

  useEffect(() => {
    dispatch(getProductList({ ...searchQuery }));
  }, [query, searchQuery, dispatch]);

  useEffect(() => {
    setSearchQuery({
      pageSize: 8,
      page: query.get("page") || 1,
      name: query.get("name") || "",
    });
  }, [query]);
  useEffect(() => {
    //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
    if (searchQuery.name === "") {
      delete searchQuery.name;
    }
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate(`?${query}`);
  }, [searchQuery, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }
  const handlePageClick = ({ selected }) => {
    //  쿼리에 페이지값 바꿔주기
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };
  return (
    <Container className="position-relative">
      <Row>
        {productList.length > 0 ? (
          productList.map((item) => (
            <Col md={3} sm={12} key={item._id}>
              <ProductCard item={item} />
            </Col>
          ))
        ) : (
          <div className="text-align-center empty-bag">
            {searchQuery.name ? (
              <h2>{searchQuery.name}과 일치한 상품이 없습니다!</h2>
            ) : (
              <h2>등록된 상품이 없습니다!</h2>
            )}
          </div>
        )}
        <RecentProducts productList={productList} />
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPageNum}
          forcePage={searchQuery.page - 1}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          className="display-center list-style-none"
        />
      </Row>
    </Container>
  );
};

export default LandingPage;
