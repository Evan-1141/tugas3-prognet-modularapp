function CartItem({
  item,
  onRemove,
  onIncrease,
  onDecrease,
}) {
  return (
    <article className="cart-item">
      <div className={'cart-thumb ' + item.brand.toLowerCase()} aria-hidden="true">{item.brand.slice(0, 1)}</div>
      <div className="cart-item-details">
        <div className="cart-item-topline">
          <div><p>{item.brand}</p><h3>{item.name}</h3></div>
          <button className="remove-button" type="button" onClick={() => onRemove(item.id)} aria-label={'Hapus ' + item.name}>x</button>
        </div>
        <p className="item-price">Rp {item.price.toLocaleString('id-ID')}</p>
        <div className="cart-item-controls">
          <div className="quantity-control">
            <button type="button" onClick={() => onDecrease(item.id)} aria-label={'Kurangi jumlah ' + item.name}>-</button>
            <span>{item.quantity}</span>
            <button type="button" onClick={() => onIncrease(item.id)} aria-label={'Tambah jumlah ' + item.name}>+</button>
          </div>
          <b>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</b>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
