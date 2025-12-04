import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { OrderStatus } from '../types/order';

const statuses: OrderStatus[] = ['Placed', 'Accepted', 'On the way', 'Delivered'];

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-600';
    case 'On the way':
      return 'bg-blue-600';
    case 'Accepted':
      return 'bg-yellow-600';
    case 'Placed':
      return 'bg-neutral-400';
    default:
      return 'bg-neutral-400';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { getOrderById, updateOrderStatus } = useOrders();

  const order = id ? getOrderById(id) : undefined;

  if (!order) {
    return (
      <div className="px-4 py-12 text-center">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-xl font-bold text-neutral-900 mb-2">Order not found</h2>
        <p className="text-neutral-600 mb-6">The order you're looking for doesn't exist.</p>
        <Link
          to="/orders"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const currentStatusIndex = statuses.indexOf(order.status);

  const handleAdvanceStatus = () => {
    const currentIndex = statuses.indexOf(order.status);
    if (currentIndex < statuses.length - 1) {
      updateOrderStatus(order.id, statuses[currentIndex + 1]);
    }
  };

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="px-4 py-4 bg-white border-b border-neutral-200 mb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-neutral-900">Order Details</h1>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              order.status
            )} text-white`}
          >
            {order.status}
          </span>
        </div>
        <div className="text-xs text-neutral-500">
          Order #{order.id.split('-').slice(-1)[0]} · {formatDate(order.createdAt)}
        </div>
      </div>

      {/* Status Timeline */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold text-neutral-900 mb-4">Order Status</h2>
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="space-y-4">
            {statuses.map((status, index) => {
              const isActive = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              return (
                <div key={status} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${
                      isActive ? getStatusColor(status) : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-medium ${
                        isActive ? 'text-neutral-900' : 'text-neutral-400'
                      }`}
                    >
                      {status}
                    </div>
                    {isCurrent && (
                      <div className="text-xs text-green-600 mt-0.5">Current status</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Dev button to advance status */}
          {order.status !== 'Delivered' && (
            <button
              onClick={handleAdvanceStatus}
              className="mt-4 w-full py-2 px-4 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              Advance Status (Dev)
            </button>
          )}
        </div>
      </div>

      {/* Delivery Address */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold text-neutral-900 mb-4">Delivery Address</h2>
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="space-y-2 text-sm">
            <div className="font-semibold text-neutral-900">{order.address.name}</div>
            <div className="text-neutral-600">{order.address.phone}</div>
            <div className="text-neutral-600">
              {order.address.flat}, {order.address.street}
            </div>
            <div className="text-neutral-600">
              {order.address.city} - {order.address.pincode}
            </div>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold text-neutral-900 mb-4">Items</h2>
        <div className="bg-white rounded-xl border border-neutral-200 p-4 space-y-4">
          {order.items.map((item) => (
            <div key={item.product.id} className="flex gap-4">
              <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {item.product.imageUrl ? (
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-xl text-neutral-400">
                    {item.product.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-neutral-900 mb-1">{item.product.name}</div>
                <div className="text-xs text-neutral-500 mb-2">{item.product.pack}</div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-neutral-600">
                    Qty: {item.quantity} × ₹{item.product.price}
                  </div>
                  <div className="font-semibold text-neutral-900">
                    ₹{(item.product.price * item.quantity).toFixed(0)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="px-4 mb-24">
        <h2 className="text-lg font-bold text-neutral-900 mb-4">Summary</h2>
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-neutral-700">
              <span>Subtotal</span>
              <span className="font-medium">₹{order.subtotal.toFixed(0)}</span>
            </div>
            {order.fees.platformFee && (
              <div className="flex justify-between text-neutral-700">
                <span>Platform Fee</span>
                <span className="font-medium">₹{order.fees.platformFee}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-700">
              <span>Delivery Charges</span>
              <span className={`font-medium ${order.fees.deliveryFee === 0 ? 'text-green-600' : ''}`}>
                {order.fees.deliveryFee === 0 ? 'Free' : `₹${order.fees.deliveryFee}`}
              </span>
            </div>
          </div>
          <div className="border-t border-neutral-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-neutral-900">Total</span>
              <span className="text-xl font-bold text-neutral-900">
                ₹{order.totalAmount.toFixed(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


