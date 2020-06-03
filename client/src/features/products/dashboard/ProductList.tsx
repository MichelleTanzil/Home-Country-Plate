import React, { useContext, useEffect, Fragment } from 'react'
import { List, Label, Item } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import ProductStore from '../../../app/stores/productStore';

const ProductList: React.FC = () => {
  const productStore = useContext(ProductStore);
  const { loadProducts, productsByCategories: products } = productStore;
  useEffect(() => {
    loadProducts();
  }, [loadProducts])
  return (
    <List>
      {products.map(([group, products]) => (
        <Fragment key={group}>
          <Label size="large" color="olive">{group}</Label>
          <Item.Group divided>
            {products.map(product => (
              <List.Item key={product.id} as={Link} to={`/products/${product.id}`}>{product.title}</List.Item>

            ))}
          </Item.Group>
        </Fragment>
      ))}
    </List>
  )
}

export default observer(ProductList);