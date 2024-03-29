import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from "../context/ShopingCartContext"


type StoreItemProps = {
  id: number,
  name: string,
  price: number,
  imgUrl: string
}

export default function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {

  const { getItemQuantity, removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart()

  const quantity = getItemQuantity(id)


  return (
    <Card className="h-100">
      <Card.Img variant="top" src={imgUrl} height="200px" style={{ objectFit: "cover" }} />

      <Card.Body className="d-flex flex-column" >
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add to Cart</Button>
          ) : <div className="d-flex align-items-center justify-content-between" style={{ gap: ".5rem" }}>
            <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
              <Button className="w-100" onClick={() => decreaseCartQuantity(id)}>-</Button>
              <div className="d-flex fs-3">
                {quantity} 
              </div>

              <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+</Button>

            </div>
            <Button className="" variant="danger" onClick={() => removeFromCart(id)}>Remove</Button>
          </div>}
        </div>
      </Card.Body>
    </Card>
  )
}
