import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Search, Grid, Header, Segment } from "semantic-ui-react";
import { IProduct } from "../../../app/models/product";

const ProductSearchBar = () => {
  const rootStore = useContext(RootStoreContext);
  const { products } = rootStore.productStore;

  const [barState, setBarState] = useState();
  const [results, setResults] = useState<IProduct[]>([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleResultSelect = (e: any, { result: {} }) => setBarState();
  // const handleSearchChange = (e: any, { result: {} }) => setBarState();

  return (
    <div></div>
    // <Search
    //   loading={loading}
    //   onResultSelect={handleResultSelect}
    //   onSearchChange={handleSearchChange}
    //   results={results}
    //   value={value}
    //   showNoResults
    // />
  );
};

export default observer(ProductSearchBar);
