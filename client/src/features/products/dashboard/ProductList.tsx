import React, { useState, useEffect } from 'react'
import { IProduct } from '../../../models/product';
import { List } from 'semantic-ui-react';
import axios from 'axios';

export const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axios.get<IProduct[]>("http://localhost:5000/api/products").then(response => {
      setProducts(response.data)
    })
  }, [])
  return (
    <List>
      {products.map(prod => (
        <List.Item key={prod.id}>{prod.title}</List.Item>
      ))}
    </List>
  )
}
