import React, { Component } from 'react';
import { InstantSearch,
           Hits, SearchBox, Highlight, Stats, 
           RefinementList, Pagination, ClearAll, SortBy,
           CurrentRefinements, PoweredBy, HitsPerPage, ScrollTo, Menu } from 'react-instantsearch/dom';

import './App.css';
import './styles/card.css'

// <Highlight attributeName="title" hit={hit} />

const Product = ({hit}) =>
  <div className="ui card" style={{'marginRight': '10px' }}>
    <a className="image" href="#"><img src={hit.image} alt="" /></a>
    <div className="content">
      <div className="header"><Highlight attributeName="title" hit={hit} /></div>
      <div className="description">Colour: <Highlight attributeName="colour" hit={hit} /></div>
      <div className="description">Size: <Highlight attributeName="size" hit={hit} /></div>
      <div className="meta">By: <Highlight attributeName="vendor" hit={hit} /></div>
      <div className="right floated hit-price">${hit.price}</div>
    </div>
  </div>

  const Search = () =>
  <div className="search-box">
    <SearchBox autoFocus />
    <div className="clear-all"><ClearAll clearsQuery /></div>
    <div className="stats"><Stats /></div>
  </div>

  // Filter attributeNames have to be set as facets in display tab in dashboard
const Filters = () => 
  <div>
    <h5>Sort by</h5>
    <SortBy
      defaultRefinement = "stylista"
      items = {
        [{
            value: 'stylista',
            label: 'Sort by relevance'
          },
          {
            value: 'stylista_price_asc',
            label: 'Sort by price asc'
          },
          {
            value: 'stylista_price_desc',
            label: 'Sort by price desc'
          },
        ]
      } />
    <h5>Vendor</h5>
    <RefinementList attributeName="vendor" />
    <hr />
    <h5 className="filter-title">Colour</h5>
    <Menu attributeName="colour" />
    <hr />
    <h5 className="filter-title">Type</h5>
    <Menu attributeName="type"/>
    <hr />
    <h5 className="filter-title">Size</h5>
    <Menu attributeName="size" />
  </div>


class App extends Component {
  render() {
    return (
      <InstantSearch
        appId="BIZ3ZAHUNB"
        apiKey="d61243292bb71f87ee593848fb1ba5eb"
        indexName="stylista"
      >
      <Search />
      <div className="current-refinements"><CurrentRefinements /></div>
      <div className="main">
        <div className="filters"><Filters /></div>
        <div><ScrollTo><Hits hitComponent={Product} /></ScrollTo></div>
        </div>
      <div className="footer">
        <div className="pagination"><Pagination showLast /></div>
        <HitsPerPage defaultRefinement={15}
          items={[{ value: 40, label: 'Show 40' }, { value: 60, label: 'Show 60' }]} 
        />
        <div clasName="attrib"><PoweredBy /></div>
      </div>
      </InstantSearch>
    );
  }
}

export default App;
