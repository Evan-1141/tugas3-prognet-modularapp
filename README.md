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

````markdown
## 2. Bedah Code

### A. Pengelolaan State pada `App.jsx`

State utama aplikasi dikelola pada `App.jsx` menggunakan `useState`. Terdapat tiga state utama, yaitu `search`, `selectedBrand`, dan `cart`.

```jsx
const [search, setSearch] = useState('');
const [selectedBrand, setSelectedBrand] = useState('ALL');
const [cart, setCart] = useState([]);
````

`search` digunakan untuk menyimpan kata kunci pencarian produk. `selectedBrand` digunakan untuk menyimpan brand yang sedang dipilih pada filter. Sementara itu, `cart` digunakan untuk menyimpan produk yang ditambahkan ke keranjang beserta quantity-nya.

Pengelolaan state ditempatkan di `App.jsx` karena component ini berperan sebagai Parent Component yang menjadi pusat data dan logic aplikasi.

### B. Controlled Form Input

Input pencarian pada `SearchBar.jsx` menggunakan konsep Controlled Component. Nilai input dikendalikan oleh state `search` yang berada di `App.jsx`.

```jsx
<SearchBar
  search={search}
  onSearch={setSearch}
/>
```

Kemudian nilai tersebut digunakan pada input:

```jsx
<input
  type="text"
  value={search}
  onChange={(e) => onSearch(e.target.value)}
  placeholder="Cari nama sepatu..."
/>
```

Props `search` digunakan sebagai nilai `value` pada input, sedangkan `onSearch` digunakan untuk memperbarui state ketika pengguna mengetik. Dengan demikian, nilai input selalu mengikuti state yang dikelola oleh Parent Component.

### C. Filtering Produk

Data produk disimpan dalam array `SHOES_DATA` di `App.jsx`. Data tersebut kemudian difilter berdasarkan kata kunci pencarian dan brand yang dipilih.

```jsx
const filteredShoes = SHOES_DATA.filter((shoe) => {
  const matchSearch = shoe.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchBrand =
    selectedBrand === 'ALL' ||
    shoe.brand === selectedBrand;

  return matchSearch && matchBrand;
});
```

`matchSearch` digunakan untuk mencocokkan nama sneaker dengan kata kunci pencarian. `matchBrand` digunakan untuk mencocokkan brand yang dipilih. Hanya produk yang memenuhi kedua kondisi tersebut yang akan ditampilkan.

Hasil filtering kemudian dikirim ke `ProductList.jsx` melalui Props:

```jsx
<ProductList
  shoes={filteredShoes}
  onAddToCart={handleAddToCart}
/>
```

### D. Props Parent ke Child

Props digunakan untuk mengirim data dan fungsi dari `App.jsx` kepada Child Component.

Contohnya pada `ProductList.jsx`:

```jsx
<ProductList
  shoes={filteredShoes}
  onAddToCart={handleAddToCart}
/>
```

`shoes` berisi data produk yang sudah difilter, sedangkan `onAddToCart` merupakan callback yang digunakan untuk menambahkan produk ke keranjang.

Pada `ProductList.jsx`, data tersebut diteruskan ke `ProductCard.jsx`:

```jsx
<ProductCard
  key={shoe.id}
  shoe={shoe}
  onAddToCart={onAddToCart}
/>
```

Dengan demikian, `ProductCard` tidak perlu memiliki data produk sendiri karena data tersebut diberikan oleh Parent melalui Props.

### E. Event Callback

Event Callback digunakan ketika Child Component perlu menjalankan fungsi yang mengubah state di Parent Component.

Pada `ProductCard.jsx`, tombol tambah ke keranjang menjalankan:

```jsx
<button onClick={() => onAddToCart(shoe)}>
  Tambah ke Keranjang
</button>
```

Ketika tombol ditekan, `onAddToCart` dipanggil dengan data sneaker yang dipilih. Callback tersebut berasal dari `App.jsx` dan menjalankan fungsi `handleAddToCart`.

```jsx
const handleAddToCart = (shoe) => {
  setCart((currentCart) => {
    const existingItem = currentCart.find(
      (item) => item.id === shoe.id
    );

    if (existingItem) {
      return currentCart.map((item) =>
        item.id === shoe.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [
      ...currentCart,
      {
        ...shoe,
        quantity: 1,
      },
    ];
  });
};
```

Jika produk sudah ada di keranjang, quantity akan bertambah satu. Jika belum ada, produk akan ditambahkan dengan quantity awal `1`.

### F. Pengelolaan Quantity

Perubahan quantity juga dikendalikan oleh `App.jsx` melalui callback.

Untuk menambah quantity digunakan:

```jsx
const handleIncreaseQuantity = (id) => {
  setCart((currentCart) =>
    currentCart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};
```

Sedangkan untuk mengurangi quantity digunakan:

```jsx
const handleDecreaseQuantity = (id) => {
  setCart((currentCart) =>
    currentCart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};
```

Ketika quantity mencapai `0`, produk akan otomatis dihapus dari array `cart`.

Callback tersebut dikirim ke `Cart.jsx`:

```jsx
<Cart
  cart={cart}
  onRemove={handleRemoveFromCart}
  onIncrease={handleIncreaseQuantity}
  onDecrease={handleDecreaseQuantity}
/>
```

Kemudian diteruskan kepada `CartItem.jsx` agar tombol `+` dan `-` dapat menjalankan fungsi yang berada di Parent.

### G. Penghapusan Produk

Penghapusan produk dilakukan menggunakan callback `handleRemoveFromCart`.

```jsx
const handleRemoveFromCart = (id) => {
  setCart((currentCart) =>
    currentCart.filter((item) => item.id !== id)
  );
};
```

Fungsi tersebut menggunakan `filter()` untuk membuat array baru yang tidak berisi produk dengan `id` yang dipilih.

### H. Perhitungan Total Harga

Total harga keranjang dihitung pada `Cart.jsx` menggunakan `reduce()`.

```jsx
const total = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
```

Setiap harga produk dikalikan dengan quantity, kemudian seluruh hasilnya dijumlahkan untuk mendapatkan total belanja.

Hasil total kemudian ditampilkan menggunakan format mata uang Indonesia:

```jsx
Rp {total.toLocaleString('id-ID')}
```

Dengan penggunaan `map()`, `filter()`, dan `reduce()`, aplikasi dapat mengelola daftar produk, proses pencarian dan filtering, serta perhitungan keranjang secara dinamis tanpa mengubah data sumber secara langsung.

Berikut log user-facing yang masih dapat saya akses. Output tool dan reasoning internal tidak termasuk karena bukan respons chat Codex. Log ini mencakup seluruh percakapan pengerjaan sebelum permintaan log ini.

## 1. Prompt User

```text
Saya sedang mengerjakan tugas React/Vite dengan tema Sneaker Store. Kamu adalah developer frontend javascript. Tolong lanjutkan project yang sudah ada, jangan membuat project baru dan jangan mengubah arsitektur component yang sudah dibuat.

Ketentuan tugas:

1. Minimal 3 component modular di src/components/
2. State dan controlled form input dikelola di Parent (App.jsx)
3. Props digunakan untuk mengirim data dari Parent ke Child
4. Event Callback digunakan untuk mengirim event dari Child ke Parent
5. Component yang sudah ada:
   - Header.jsx
   - SearchBar.jsx
   - BrandFilter.jsx
   - ProductList.jsx
   - ProductCard.jsx
   - Cart.jsx
   - CartItem.jsx

Saat ini logic utama sudah berjalan:

- Search sneaker
- Filter berdasarkan brand
- Menambahkan produk ke cart
- Menghapus produk dari cart
- Quantity produk di cart
- Menambah dan mengurangi quantity
- Menghitung total harga

Tugasmu sekarang:

1. Periksa seluruh source code yang ada terlebih dahulu.
2. Jangan menghapus component yang sudah ada.
3. Jangan memindahkan state utama keluar dari App.jsx.
4. Pertahankan Props dan Event Callback yang sudah digunakan.
5. Jika ada logic/state yang belum lengkap atau kurang tepat, perbaiki seperlunya.
6. Setelah logic dipastikan aman, buat UI/UX Sneaker Store yang lebih profesional dan menarik.
7. Gunakan CSS yang sudah ada atau rapikan App.css dan index.css.
8. Buat layout responsive untuk desktop dan mobile.
9. Buat navbar/header yang rapi.
10. Buat search bar yang modern.
11. Buat filter brand yang jelas dan interaktif.
12. Buat ProductCard berbentuk card dengan gambar sneaker, nama, brand, kategori, harga, dan tombol tambah ke keranjang.
13. Buat Cart yang rapi dengan quantity control (+/-), tombol hapus, subtotal/total, dan empty state.
14. Gunakan data lokal terlebih dahulu, tidak perlu backend atau API eksternal.
15. Jangan menambahkan library UI eksternal kecuali memang sudah tersedia di package.json.
16. Gunakan gambar produk dari assets lokal jika memungkinkan. Jika belum tersedia, gunakan placeholder yang tidak membutuhkan API eksternal.
17. Pastikan npm run dev tetap berjalan tanpa error.
18. Setelah selesai, jelaskan file apa saja yang diubah dan jelaskan secara singkat state, props, dan callback yang digunakan.

Kerjakan langsung pada file project yang ada. Jangan hanya memberikan contoh kode di chat.
```

## 2. Respons Codex

```text
Saya akan memeriksa struktur dan source yang ada terlebih dahulu, lalu merapikan logic seperlunya dan membangun ulang tampilan tanpa mengubah arsitektur component maupun memindahkan state utama dari `App.jsx`.
```

```text
Struktur component dan logic dasarnya sudah sesuai. Saya menemukan CSS masih template bawaan Vite serta tampilan component yang belum memiliki class/semantik UI; saya akan mempertahankan semua tujuh component dan callback-nya, menambahkan presentasi produk lokal berbasis SVG placeholder, serta memperbaiki hitungan badge keranjang agar mencerminkan total item (bukan jumlah baris produk).
```

```text
Akses workspace saat ini bersifat read-only, jadi perubahan belum bisa ditulis oleh patch biasa. Saya meminta izin write sekali untuk menerapkan patch yang tetap terbatas pada file React/CSS project ini; setelah itu saya akan menjalankan build untuk memastikan tidak ada error.
```

```text
Izin tulis sudah aktif dan patch kini dapat diterapkan. Saya lanjutkan dengan penggantian presentasi UI pada component yang sama (tanpa menghapus arsitekturnya), lalu saya validasi hasil build.
```

```text
Tampilan inti sudah diperbarui: header bernavigasi, filter aktif, kartu produk dengan ilustrasi sneaker lokal, serta keranjang dengan kontrol kuantitas, ringkasan total, dan empty state. Saya sedang menjalankan validasi akhir untuk memastikan Vite tetap membangun project tanpa error.
```

```text
Project Sneaker Store sudah dilanjutkan dan berhasil divalidasi.

Perubahan utama:

- Memperbarui [App.jsx](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas-pertemuan3-prognet/tugas3-prognet/src/App.jsx) agar badge keranjang menghitung total quantity, serta penghapusan cart memakai functional state update.
- Merapikan seluruh component yang sudah ada:
  [Header.jsx](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas-pertemuan3-prognet/tugas3-prognet/src/components/Header.jsx), [SearchBar.jsx](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas3-prognet/tugas3-prognet/src/components/SearchBar.jsx), [BrandFilter.jsx](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas3-prognet/tugas3-prognet/src/components/BrandFilter.jsx), [ProductList.jsx](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas3-prognet/tugas3-prognet/src/components/ProductList.jsx), [ProductCard.jsx](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas3-prognet/tugas3-prognet/src/components/ProductCard.jsx), [Cart.jsx](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas3-prognet/tugas3-prognet/src/components/Cart.jsx), dan [CartItem.jsx](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas3-prognet/tugas3-prognet/src/components/CartItem.jsx).
- Menambahkan UI responsive di [App.css](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas3-prognet/tugas3-prognet/src/App.css) dan baseline global di [index.css](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas3-prognet/tugas3-prognet/src/index.css).
- Product card sekarang memiliki ilustrasi sneaker SVG lokal, brand, kategori, harga, serta tombol tambah.
- Cart memiliki quantity control, hapus item, subtotal, total, checkout button, dan empty state.
- Layout responsive: grid 3 kolom desktop, 2 kolom tablet, dan 1 kolom mobile.

State tetap berada di `App.jsx`: `search`, `selectedBrand`, dan `cart`. Props dikirim dari parent ke child, sementara callback seperti `onSearch`, `onBrandChange`, `onAddToCart`, `onRemove`, `onIncrease`, dan `onDecrease` mengirim event kembali ke parent.

Validasi berhasil:

- `npm run build` ✅
- `npm run lint` ✅
```

## 3. Prompt User

```text
Tolong bantu perbaiki UI/UX Sneaker Store yang sudah ada. Dari tampilan sekarang, saya ingin desainnya dibuat lebih stylish, modern, dan cocok dengan tema brand sepatu.

Yang paling penting, buat tampilannya responsive untuk desktop, tablet, dan smartphone. Di mobile jangan sampai ada elemen yang keluar layar atau menyebabkan horizontal scroll. Product card juga perlu menyesuaikan jumlah kolom berdasarkan ukuran layar.

Tolong rapikan bagian keranjang karena sekarang terlihat terlalu besar saat masih kosong. Buat empty state yang lebih compact dan menarik, lalu kalau sudah ada produk, tampilkan item, quantity, tombol +/- , hapus, dan total dengan layout yang lebih rapi.

Untuk font, saya ingin gaya yang lebih catchy, bold, modern, dan sporty seperti website brand sneaker, tetapi tetap nyaman dibaca. Rapikan juga spacing, warna, button, card, hover effect, dan header supaya keseluruhan website terasa lebih premium.

Silakan sesuaikan App.css, index.css, dan component JSX jika memang diperlukan. Jangan mengubah logic yang sudah berjalan seperti search, filter brand, state di App.jsx, props, callback, dan fitur cart.

Setelah selesai, pastikan npm run dev tidak error dan semua fitur sebelumnya tetap berjalan.
```

## 4. Respons Codex

```text
Saya akan fokus pada penyempurnaan visual tanpa menyentuh alur state, props, maupun callback. Saya cek kondisi file terbaru dulu, lalu rapikan CSS dan markup presentasional agar responsif sampai smartphone tanpa horizontal scroll.
```

```text
Saya menemukan penyebab utama UI terasa belum konsisten: masih ada CSS template Vite yang membatasi `#root`, sementara katalog dan cart masih tersusun vertikal tanpa wrapper layout. Saya akan menambahkan wrapper presentasional saja—logic dan aliran props/callback tetap persis sama.
```

```text
Struktur responsif sudah diterapkan: katalog dan cart menjadi dua kolom pada desktop, tetap rapat di tablet, lalu berubah satu kolom di mobile. Empty cart diperkecil, dan item cart kini memiliki thumbnail brand, quantity control, hapus, serta line total yang lebih tertata.
```

```text
UI/UX Sneaker Store sudah diperbarui tanpa mengubah logic search, filter, state parent, props, callback, maupun fitur cart.

Yang ditingkatkan:

- Layout katalog + cart responsif: desktop 2 kolom, tablet lebih rapat, mobile 1 kolom.
- Product grid: 3 kolom desktop, 2 kolom tablet/mobile besar, 1 kolom smartphone kecil.
- Tidak ada lebar fixed pada root; `overflow-x` dicegah untuk mobile.
- Header lebih sporty dengan navigasi desktop dan cart badge.
- Font, warna, hover, spacing, filter, search bar, dan card dibuat lebih premium.
- Cart empty state sekarang lebih compact.
- Cart berisi item kini lebih rapi: thumbnail brand, tombol hapus, kontrol quantity `+/-`, line total, subtotal, dan total.
- Product card mempertahankan ilustrasi sneaker SVG lokal serta informasi kategori, nama, harga, dan tombol tambah.

File yang diperbarui:

- [App.jsx](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas-pertemuan3-prognet/tugas3-prognet/src/App.jsx)
- [App.css](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas3-prognet/tugas3-prognet/src/App.css)
- [index.css](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas3-prognet/tugas3-prognet/src/index.css)
- [SearchBar.jsx](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas3-prognet/tugas3-prognet/src/components/SearchBar.jsx)
- [BrandFilter.jsx](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas3-prognet/tugas3-prognet/src/components/BrandFilter.jsx)
- [Cart.jsx](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas3-prognet/tugas3-prognet/src/components/Cart.jsx)
- [CartItem.jsx](C:/Users/Evan%20Danendra/OneDrive/Documents/SEMESTER%203/PEMROGRAMAN%20INTERNET/Tugas/tugas3-prognet/tugas3-prognet/src/components/CartItem.jsx)

Validasi berhasil:

- `npm run build` ✅
- `npm run lint` ✅
- `npm run dev -- --host 127.0.0.1` berjalan tanpa error ✅
```