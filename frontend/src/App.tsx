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
import DeliveryLayout from './modules/delivery/components/DeliveryLayout';
import DeliveryDashboard from './modules/delivery/pages/DeliveryDashboard';
import DeliveryOrders from './modules/delivery/pages/DeliveryOrders';
import DeliveryNotifications from './modules/delivery/pages/DeliveryNotifications';
import DeliveryMenu from './modules/delivery/pages/DeliveryMenu';
import SellerLayout from './modules/seller/components/SellerLayout';
import SellerDashboard from './modules/seller/pages/SellerDashboard';
import SellerOrders from './modules/seller/pages/SellerOrders';
import SellerOrderDetail from './modules/seller/pages/SellerOrderDetail';

function App() {
  return (
    <CartProvider>
      <OrdersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* Delivery App Routes */}
            <Route path="/delivery/*" element={
              <DeliveryLayout>
                <Routes>
                  <Route path="" element={<DeliveryDashboard />} />
                  <Route path="orders" element={<DeliveryOrders />} />
                  <Route path="notifications" element={<DeliveryNotifications />} />
                  <Route path="menu" element={<DeliveryMenu />} />
                </Routes>
              </DeliveryLayout>
            } />
            {/* Seller App Routes */}
            <Route path="/seller/*" element={
              <SellerLayout>
                <Routes>
                  <Route path="" element={<SellerDashboard />} />
                  <Route path="orders" element={<SellerOrders />} />
                  <Route path="orders/:id" element={<SellerOrderDetail />} />
                  <Route path="return-order" element={<SellerDashboard />} />
                  <Route path="wallet-transaction" element={<SellerDashboard />} />
                </Routes>
              </SellerLayout>
            } />
            {/* Main App Routes */}
            <Route path="/*" element={
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/user/home" element={<Home />} />
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

