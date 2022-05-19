import { useDispatch } from "react-redux";
import { CartItem, deleteItem } from "../../redux/modules/cart";
import CheckBox from "../@shared/CheckBox/styles";
import Delete from "../../assets/Delete.png";
import {
  CartProductContainer,
  ProductAmountContainer,
  ProductAmountWrapper,
  ProductCounterContainer,
  ProductImageContainer,
  ProductOptionContainer,
} from "./styles";

interface CartProductProps {
  item: CartItem;
}

function CartProduct({ item: { id, img, name, price, amount } }: CartProductProps) {
  const dispatch = useDispatch();

  const onClickDeleteItem = () => {
    dispatch(deleteItem(id));
  };

  return (
    <CartProductContainer>
      <CheckBox />
      <ProductImageContainer>
        <img src={img} alt={name} />
        <span>{name}</span>
      </ProductImageContainer>
      <ProductOptionContainer>
        <img src={Delete} alt="상품 삭제" onClick={onClickDeleteItem} />
        <ProductAmountContainer>
          <ProductAmountWrapper>{amount}</ProductAmountWrapper>
          <ProductCounterContainer>
            <button>▲</button>
            <button>▼</button>
          </ProductCounterContainer>
        </ProductAmountContainer>
        <span>{price.toLocaleString()}원</span>
      </ProductOptionContainer>
    </CartProductContainer>
  );
}

export default CartProduct;
