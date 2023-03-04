import React, { useState } from 'react';
import styled from 'styled-components';
import { HeartFill } from '@styled-icons/bootstrap';
import { Heart } from '@styled-icons/bootstrap';
import { ProductType } from '../../utils/mongo/Product';

const Container = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: 50px;
  @media (min-width: 600px) {
    width: auto;
    margin: 0 40px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    width: auto;
    margin: 0 60px;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1200px) {
    width: auto;
    margin: 0 80px;
    grid-template-columns: repeat(4, 1fr);
  }
  gap: 10px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  width: 100%;
  padding-bottom: 10px;
`;

const ImageMask = styled.div`
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.4)
  );
`;

const Image = styled.img`
  object-fit: cover;
  max-width: 100%;
  height: 350px;
  vertical-align: middle;
  position: relative;
  z-index: -1;
  @media (min-width: 600px) {
    height: 250px;
  }
`;

const SellerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0 10px 15px;
  width: 100%;
`;
const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: url('/user.jpeg');
  background-size: cover;
`;
const SellerName = styled.span`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.7rem;
  font-weight: 600;
`;

const NameLikeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  margin-top: -50px;
  margin-bottom: 30px;
`;

const NamePriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Name = styled.span`
  font-size: 0.7rem;
  color: #ffffff;
`;
const Price = styled.span`
  font-size: 1rem;
  color: #ffffff;
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
`;

const Description = styled.span`
  font-size: 0.7rem;
  color: #949494;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 10px;
  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
const HeartIconFilled = styled(HeartFill)`
  color: #3a3838;
  stroke: #ffffff;
  stroke-width: 0.5px;
  cursor: pointer;
`;
const HeartIconLikeFilled = styled(HeartFill)`
  color: ${({ theme }) => theme.colors.secondary};
`;
const HeartIcon = styled(Heart)`
  color: #ffffff;
  stroke-width: 0.5px;
  cursor: pointer;
`;

const Likes = styled.span`
  font-size: 0.7rem;
  margin-left: 5px;
  font-weight: 600;
`;
const Tags = styled.span`
  font-size: 0.7rem;
  font-weight: 400;
  margin-top: 10px;
`;
const Comments = styled.span`
  font-size: 0.7rem;
  font-weight: 400;
  margin-top: 10px;
  color: #949494;
`;

interface props {
  fetchedroducts: ProductType[];
  isLikedProducts: boolean;
}

export default function CardWrapper({
  fetchedroducts,
  isLikedProducts,
}: props) {
  const [products, setProducts] = useState([...fetchedroducts]);
  const handleLike = async (id: string, isLiked: boolean) => {
    try {
      // const res = await fetch(`/api/products/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ isLiked: isLiked ? false : true }),
      // });
      const API = process.env.NEXT_PUBLIC_API;
      const res = await fetch(`${API}/change-favourite/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isLiked: isLiked ? false : true }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const { success } = await res.json();
      if (success && !isLikedProducts) {
        const res = await fetch(`/api/products/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const { data } = await res.json();
        if (data) {
          setProducts([...data]);
        }
      } else if (success && isLikedProducts) {
        const res = await fetch(`/api/liked-products/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const { data } = await res.json();
        if (data) {
          setProducts([...data]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      {products.length === 0 && (
        <span>You have not liked any product yet.</span>
      )}
      {products &&
        products.map((product, index) => {
          return (
            <Card key={index}>
              <SellerWrapper>
                <Avatar />
                <SellerName>{product.seller_name}</SellerName>
              </SellerWrapper>
              <ImageMask>
                <Image src={product.image_url} />
              </ImageMask>

              <NameLikeWrapper>
                <NamePriceWrapper>
                  <Name>{product.name}</Name>
                  <Price>{'AED ' + product.price}</Price>
                </NamePriceWrapper>
                {product.isLiked ? (
                  <HeartIconFilled
                    size='20'
                    onClick={() => handleLike(product._id, product.isLiked)}
                  />
                ) : (
                  <HeartIcon
                    size='20'
                    onClick={() => handleLike(product._id, product.isLiked)}
                  />
                )}
              </NameLikeWrapper>
              <Details>
                <HeartIconLikeFilled size='15' />
                <Likes>{product.likes + ' likes'}</Likes>
              </Details>

              <Details>
                <Description> {product.description}</Description>
              </Details>

              <Details>
                {product.tags &&
                  product.tags.map((tag) => <Tags>{'#' + tag}</Tags>)}
              </Details>
              <Details>
                <Comments>View 12 comments</Comments>
              </Details>
            </Card>
          );
        })}
    </Container>
  );
}
