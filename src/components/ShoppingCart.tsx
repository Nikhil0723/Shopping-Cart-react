import { Offcanvas, OffcanvasBody, OffcanvasTitle, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShopingCartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import StoreItem from "../data/items.json"


type ShoppingCartProps = {
    isOpen: boolean
}

export default function ShoppingCart({ isOpen }:ShoppingCartProps) {

    const { closeCart , cartItems } = useShoppingCart()

    return (
        <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
            <Offcanvas.Header closeButton>
                <OffcanvasTitle>
                    Cart
                </OffcanvasTitle>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                   {cartItems.map(item => (
                    <CartItem key={item.id} {...item} />
                   ))}
                   <div className="ms-auto fw-bold fs-5"> 
                   Total {formatCurrency(cartItems.reduce((total , cartItem) => {
                    const item = StoreItem.find(i => i.id === cartItem.id)
                    return total + (item?.price || 0 ) * cartItem.quantity
                   }, 0))}
                   </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
