````markdown
## 1. Diagram Pohon Komponen

Aplikasi Sneaker Store menggunakan `App.jsx` sebagai Parent Component yang mengelola state utama dan mengatur komunikasi dengan component-component Child melalui Props dan Event Callback.

```text
App.jsx
│
├── Header.jsx
│   └── cartCount
│
├── SearchBar.jsx
│   ├── search
│   └── onSearch
│
├── BrandFilter.jsx
│   ├── selectedBrand
│   └── onBrandChange
│
├── ProductList.jsx
│   ├── shoes
│   └── onAddToCart
│       │
│       └── ProductCard.jsx
│           ├── shoe
│           └── onAddToCart
│
└── Cart.jsx
    ├── cart
    ├── onRemove
    ├── onIncrease
    └── onDecrease
        │
        └── CartItem.jsx
            ├── item
            ├── onRemove
            ├── onIncrease
            └── onDecrease
````

### Alur Pengiriman Props

`App.jsx` berperan sebagai Parent Component dan menjadi pusat pengelolaan state utama aplikasi. State yang dikelola terdiri dari `search`, `selectedBrand`, dan `cart`. Data dari state tersebut kemudian dikirim ke Child Component menggunakan Props sesuai kebutuhan masing-masing component.

Pada `Header.jsx`, `App.jsx` mengirim Props `cartCount` yang berasal dari jumlah item pada state `cart`. Props ini digunakan untuk menampilkan jumlah produk yang berada di dalam keranjang.

Pada `SearchBar.jsx`, `App.jsx` mengirim Props `search` sebagai nilai input pencarian dan `onSearch` sebagai callback untuk memperbarui state pencarian ketika pengguna mengetik. Dengan cara ini, nilai input tetap dikontrol oleh state yang berada di Parent Component.

Pada `BrandFilter.jsx`, `App.jsx` mengirim Props `selectedBrand` untuk mengetahui brand yang sedang aktif dan `onBrandChange` sebagai callback untuk mengubah pilihan brand. Ketika pengguna memilih salah satu brand, callback tersebut akan memperbarui state `selectedBrand` di `App.jsx`.

Pada bagian produk, `App.jsx` mengirim data `filteredShoes` melalui Props `shoes` kepada `ProductList.jsx`. Component `ProductList.jsx` kemudian melakukan mapping terhadap data tersebut dan meneruskan setiap data sneaker ke `ProductCard.jsx` melalui Props `shoe`. Callback `onAddToCart` juga diteruskan sampai ke `ProductCard.jsx` agar tombol tambah ke keranjang dapat memperbarui state `cart` yang berada di `App.jsx`.

Pada bagian keranjang, `App.jsx` mengirim Props `cart` kepada `Cart.jsx` untuk menampilkan seluruh produk yang telah ditambahkan. Selain itu, `App.jsx` juga mengirim callback `onRemove`, `onIncrease`, dan `onDecrease` untuk menangani penghapusan item serta perubahan quantity.

`Cart.jsx` kemudian meneruskan data setiap produk melalui Props `item` kepada `CartItem.jsx`. Callback `onRemove`, `onIncrease`, dan `onDecrease` juga diteruskan agar setiap `CartItem` dapat menjalankan aksi yang dibutuhkan tanpa mengubah state secara langsung.

Dengan struktur tersebut, seluruh state utama tetap dikelola di `App.jsx`, sedangkan component Child bertugas menerima data melalui Props dan menjalankan aksi melalui Event Callback yang dikirim dari Parent Component.

```
```