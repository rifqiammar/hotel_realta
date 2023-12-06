import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ data, changePage }) => {
  return (
    <div className="container mt-5">
      <p>
        Total Rows: {data.totalRows} Page: {data.totalRows ? data.page + 1 : 0} of {data.totalPage}
      </p>
      <nav role="navigation" aria-label="Page navigation">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={data.totalPage}
          onPageChange={changePage}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
        />
      </nav>
    </div>
  );
};

export default Pagination;
