import CartItem from './CartItem';

function Cart({
  cart,
  onRemove,
  onIncrease,
  onDecrease,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="cart" id="cart">
      <div className="cart-heading">
        <div>
          <span className="eyebrow">Pilihanmu</span>
          <h2>Shopping bag</h2>
        </div>
        <b>{cart.reduce((sum, item) => sum + item.quantity, 0)} item</b>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <b>Bag</b>
          <h3>Keranjangmu masih kosong.</h3>
          <p>Pilih sneaker favoritmu dan mulai langkah berikutnya.</p>
          <a href="#collection">Jelajahi koleksi</a>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={onRemove}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          ))}

          <div className="cart-summary">
            <p><span>Subtotal</span><b>Rp {total.toLocaleString('id-ID')}</b></p>
            <p><span>Pengiriman</span><b>Gratis</b></p>
            <p className="total"><span>Total</span><b>Rp {total.toLocaleString('id-ID')}</b></p>
            <button type="button">Lanjut ke checkout <span aria-hidden="true">-&gt;</span></button>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
