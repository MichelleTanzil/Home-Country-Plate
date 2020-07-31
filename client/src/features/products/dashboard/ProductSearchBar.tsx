import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
// import { RootStoreContext } from "../../../app/stores/rootStore";
// import { Search } from "semantic-ui-react";
// import { IProduct } from "../../../app/models/product";
// import _ from "lodash";

const ProductSearchBar = () => {
  //   const rootStore = useContext(RootStoreContext);
  //   const { productsByCategories } = rootStore.productStore;

  //   const [results, setResults] = useState<IProduct[]>([]);
  //   const [value, setValue] = useState("");
  //   const [loading, setLoading] = useState(false);

  //   const handleResultSelect = (event: React.MouseEvent, result: IProduct) =>
  //     setValue([...results, result]);
  //   const handleSearchChange = (event: React.MouseEvent, value: string) => {
  //     setLoading(true);
  //     setTimeout(() => {
  //       if (value.length < 1) {
  //         setLoading(false);
  //         setResults([]);
  //         setValue("");
  //       }
  //       const re = new RegExp(_.escapeRegExp(value), "i");
  //       const isMatch = (result: IProduct) => re.test(result.title);
  //       setLoading(false);
  //       setResults(_.filter(productsByCategories, isMatch));
  //     }, 300);
  //   };

  //   return (
  //     <Search
  //       loading={loading}
  //       onResultSelect={() => handleResultSelect}
  //       onSearchChange={() =>
  //         _.debounce(handleSearchChange, 500, {
  //           leading: true,
  //         })
  //       }
  //       results={results}
  //       value={value}
  //       showNoResults={true}
  //     />
  //   );
  return <div></div>;
};

export default observer(ProductSearchBar);
