import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const SearchResults = (props) => {
  const searchResultList = props.data.map((searchResult) => {
    return (
      <div key={searchResult.id} className="search-result-wrapper">
        <div className="search-result-content">
          <div className="search-result-product-header">
            <h2>{searchResult.store}</h2>
          </div>
          <div className="search-result-product-details">
            <div>{`${searchResult.product}`}</div>
            <div>{`$${searchResult.price}`}</div>
          </div>
        </div>
      </div>
    );
  });
  return <div className="search-results-list-wrapper">{searchResultList}</div>;
};
export default SearchResults;
