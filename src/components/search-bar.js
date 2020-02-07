import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import SearchResults from "./search-results";
export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStore: "",
      searchProduct: "",
      searchResults: [],
      setVisible: true
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchResults.length > 0) {
      this.setState({
        searchResults: []
      });
    }
    if (!this.state.searchYearMin) {
      this.setState({ searchYearMin: 0 });
      // console.log("set year min to default")
    }
    if (!this.state.searchYearMax) {
      this.setState({ searchYearMax: 2020 });
      // console.log("set year max to default")
    }
    if (!this.state.searchMilesMin) {
      this.setState({ searchMilesMin: 0 });
      // console.log("set miles min to default")
    }
    if (!this.state.searchMilesMax) {
      this.setState({ searchMilesMax: 500000 });
      // console.log("set miles max to default")
    }
    if (!this.state.searchPriceMin) {
      this.setState({ searchPriceMin: 0 });
      // console.log("set price min to default")
    }
    if (!this.state.searchPriceMax) {
      this.setState({ searchPriceMax: 5000000 });
      // console.log("set price max to default")
    }
    axios
      // .get('http://localhost:5000/stores')
      .get("https://ksl-scraper-api-main.herokuapp.com/stores")
      .then((response) => {
        response.data.forEach((store) => {
          this.checkStore(store);
        });
      })
      .then((data) => {
        console.log("resetting state values");
        this.setState({
          searchStore: "",
          searchProduct: "",
          searchParams: "",
          setVisible: false
        });
        console.log(
          `searchStore: ${this.state.searchStore} searchProduct: ${this.state.searchProduct} searchYearMin: ${this.state.searchYearMin} searchYearMax: ${this.state.searchYearMax}`
        );
      })
      .catch((err) => [
        console.log("Error getting stores, or end of data: ", err)
      ]);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  checkStore = (store) => {
    if (
      this.state.searchStore &&
      store.store_name.toLowerCase() === this.state.searchStore.toLowerCase()
    ) {
      // console.log(`${store.store} = ${this.state.searchStore}, checking product`)
      this.checkProduct(store);
    } else if (
      this.state.searchStore &&
      store.store.toLowerCase() !== this.state.searchStore.toLowerCase()
    ) {
      // console.log('no store match, skipping')
      null;
    }
    // if there is not store and product listed then just check by year, miles, and price
    else {
      // console.log("no store entered, checking year")
      this.checkProduct(store);
    }
  };
  checkProduct = (store) => {
    if (
      this.state.searchProduct &&
      store.product.toLowerCase() === this.state.searchProduct.toLowerCase()
    ) {
      // console.log("product matches, checking product")
      this.setState({
        searchResults: [store].concat(this.state.searchResults)
      });
    } else if (
      this.state.searchProduct &&
      store.product.toLowerCase() !== this.state.searchProduct.toLowerCase()
    ) {
      // console.log('no product match, skipping')
      null;
    }
    // if there is no product listed then just check by year, miles, and price
    else {
      // console.log("no product entered, checking year")
      this.setState({
        searchResults: [store].concat(this.state.searchResults)
      });
    }
  };

  handleSetVisible = () => {
    this.setState({ setVisible: true });
  };

  render() {
    return (
      <div className="search-page-wrapper">
        {this.state.setVisible ? (
          <div className="form-wrapper">
            <form onSubmit={this.handleSubmit} className="search-form-wrapper">
              <div className="two-column">
                <div>
                  <h3>Store</h3>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    name="searchStore"
                    placeholder="Ex: Chevrolet not Chevy"
                    value={this.state.searchStore}
                  />
                </div>
                <div>
                  <h3>Product</h3>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    name="searchProduct"
                    placeholder="Product"
                    value={this.state.searchProduct}
                  />
                </div>
              </div>

              <div className="one-column">
                <button className="btn">Search</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="one-column">
            <div className="results-container">
              {this.state.searchResults.length > 0 ? (
                <SearchResults data={this.state.searchResults} />
              ) : (
                <h2>
                  No cars that match your criteria, please enter a different
                  vehicle
                </h2>
              )}
              <button
                className="new-search-btn"
                onClick={() => this.handleSetVisible()}
              >
                New Search
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
