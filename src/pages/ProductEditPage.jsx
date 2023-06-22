import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import ProductUpload from '../components/Product/ProductUpload';
import authInstance from '../api/instance/authInstance';
import { useParams } from 'react-router-dom';

export default function ProductEditPage() {
  const [buttonDisable, setButtonDisable] = useState(true);
  const { product_id } = useParams();
  const [inputValue, setInputValue] = useState({
    productId: product_id,
    itemImage: '',
    itemType: '',
    itemName: '',
    price: 0,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { product },
        } = await authInstance.get(`/product/detail/${product_id}`);
        console.log(product);
        setInputValue({
          ...inputValue,
          itemImage: product.itemImage,
          itemType: product.link,
          itemName: product.itemName,
          price: product.price,
        });
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  const handleEditSubmit = async (productData) => {
    try {
      const productResponse = await authInstance.put(
        `/product/${product_id}`,
        productData,
      );

      if (productResponse.status !== 200) {
        throw new Error('파일 업로드 에러');
      }
      console.log('상품 업로드 성공');
    } catch (error) {
      console.error(error);
    }
  };

  const handleValidChange = (isValid) => {
    setButtonDisable(!isValid);
  };
  return (
    <>
      <Header
        type="upload"
        buttonId="product"
        buttonText="저장"
        disabled={buttonDisable}
      />
      <ProductUpload
        onValidChange={handleValidChange}
        handleEditSubmit={handleEditSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </>
  );
}
