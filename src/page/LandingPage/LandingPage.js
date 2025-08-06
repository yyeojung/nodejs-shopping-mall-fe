import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/product/productSlice";
import { DotLoader } from "react-spinners";
import ReactPaginate from "react-paginate";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productList, totalPageNum, isLoading } = useSelector(
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

  if (isLoading) {
    return (
      <div className="loading-container">
        <DotLoader color="#C81E2B" />
      </div>
    );
  }
  const handlePageClick = ({ selected }) => {
    //  쿼리에 페이지값 바꿔주기
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };
  return (
    <Container>
      <Row>
        {productList.length > 0 ? (
          productList.map((item) => (
            <Col md={3} sm={12} key={item._id}>
              <ProductCard item={item} />
            </Col>
          ))
        ) : (
          <div className="text-align-center empty-bag">
            {searchQuery.name === "" ? (
              <h2>등록된 상품이 없습니다!</h2>
            ) : (
              <h2>{searchQuery.name}과 일치한 상품이 없습니다!</h2>
            )}
          </div>
        )}
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
