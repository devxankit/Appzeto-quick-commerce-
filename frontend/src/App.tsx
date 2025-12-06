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
import SellerPos from './modules/seller/pages/SellerPos';
import SellerCategory from './modules/seller/pages/SellerCategory';
import SellerSubCategory from './modules/seller/pages/SellerSubCategory';
import SellerAddProduct from './modules/seller/pages/SellerAddProduct';
import SellerBulkImport from './modules/seller/pages/SellerBulkImport';
import SellerBulkUpdate from './modules/seller/pages/SellerBulkUpdate';
import SellerTaxes from './modules/seller/pages/SellerTaxes';
import SellerProductList from './modules/seller/pages/SellerProductList';
import SellerStockManagement from './modules/seller/pages/SellerStockManagement';
import SellerWalletTransaction from './modules/seller/pages/SellerWalletTransaction';
import SellerWithdrawalRequest from './modules/seller/pages/SellerWithdrawalRequest';
import SellerProductSellingReport from './modules/seller/pages/SellerProductSellingReport';
import SellerSalesReport from './modules/seller/pages/SellerSalesReport';
import SellerPosReport from './modules/seller/pages/SellerPosReport';
import SellerReturnRequest from './modules/seller/pages/SellerReturnRequest';

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
                  <Route path="pos-orders" element={<SellerPos />} />
                  <Route path="category" element={<SellerCategory />} />
                  <Route path="subcategory" element={<SellerSubCategory />} />
                  <Route path="product/add" element={<SellerAddProduct />} />
                  <Route path="product/bulk-import" element={<SellerBulkImport />} />
                  <Route path="product/bulk-update" element={<SellerBulkUpdate />} />
                  <Route path="product/taxes" element={<SellerTaxes />} />
                  <Route path="product/list" element={<SellerProductList />} />
                  <Route path="product/stock" element={<SellerStockManagement />} />
                  <Route path="return" element={<SellerReturnRequest />} />
                  <Route path="return-order" element={<SellerReturnRequest />} />
                  <Route path="wallet-transaction" element={<SellerWalletTransaction />} />
                  <Route path="withdrawal-request" element={<SellerWithdrawalRequest />} />
                  <Route path="reports/product-selling" element={<SellerProductSellingReport />} />
                  <Route path="reports/sales" element={<SellerSalesReport />} />
                  <Route path="reports/pos" element={<SellerPosReport />} />
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

