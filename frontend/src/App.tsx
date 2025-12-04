import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OrdersProvider } from './context/OrdersContext';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import Search from './pages/Search';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import OrderAgain from './pages/OrderAgain';
import Account from './pages/Account';
import Categories from './pages/Categories';
import Category from './pages/Category';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutAddress from './pages/CheckoutAddress';
import ProductDetail from './pages/ProductDetail';
import SpiritualStore from './pages/SpiritualStore';
import PharmaStore from './pages/PharmaStore';
import EGiftStore from './pages/EGiftStore';
import PetStore from './pages/PetStore';
import SportsStore from './pages/SportsStore';
import FashionStore from './pages/FashionStore';
import ToyStore from './pages/ToyStore';
import HobbyStore from './pages/HobbyStore';
import Login from './pages/Login';

function App() {
  return (
    <CartProvider>
      <OrdersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:id" element={<OrderDetail />} />
                  <Route path="/order-again" element={<OrderAgain />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/category/:id" element={<Category />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/checkout/address" element={<CheckoutAddress />} />
                  <Route path="/store/spiritual" element={<SpiritualStore />} />
                  <Route path="/store/pharma" element={<PharmaStore />} />
                  <Route path="/store/e-gifts" element={<EGiftStore />} />
                  <Route path="/store/pet" element={<PetStore />} />
                  <Route path="/store/sports" element={<SportsStore />} />
                  <Route path="/store/fashion-basics" element={<FashionStore />} />
                  <Route path="/store/toy" element={<ToyStore />} />
                  <Route path="/store/hobby" element={<HobbyStore />} />
                </Routes>
              </AppLayout>
            } />
          </Routes>
        </BrowserRouter>
      </OrdersProvider>
    </CartProvider>
  );
}

export default App;

