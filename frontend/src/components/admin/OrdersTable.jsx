import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
});

const statusColors = {
  pending: 'bg-amber-100 text-amber-800',
  verified: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImg, setPreviewImg] = useState(null);

  const loadOrders = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/orders`, { headers: authHeaders() })
      .then((res) => res.json())
      .then(setOrders)
      .finally(() => setLoading(false));
  };

  useEffect(loadOrders, []);

  const handleStatusChange = async (order, status) => {
    await fetch(`${API_BASE_URL}/api/orders/${order._id}`, {
      method: 'PATCH',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    loadOrders();
  };

  if (loading) return <p className="text-gray-500">Loading orders...</p>;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-200 text-blue-900">
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Book</th>
              <th className="py-2 pr-4">Buyer</th>
              <th className="py-2 pr-4">Contact</th>
              <th className="py-2 pr-4">Total</th>
              <th className="py-2 pr-4">Screenshot</th>
              <th className="py-2 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-100 align-top">
                <td className="py-2 pr-4 whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="py-2 pr-4">
                  {order.bookTitle} <span className="text-gray-400">x{order.quantity}</span>
                </td>
                <td className="py-2 pr-4">
                  <div className="font-medium">{order.buyerName}</div>
                  <div className="text-gray-500 text-xs">{order.address}</div>
                </td>
                <td className="py-2 pr-4">
                  <div>{order.phone}</div>
                  <div className="text-gray-500 text-xs">{order.email}</div>
                </td>
                <td className="py-2 pr-4">Rs. {order.totalAmount.toFixed(0)}</td>
                <td className="py-2 pr-4">
                  <button onClick={() => setPreviewImg(`${API_BASE_URL}${order.paymentScreenshot}`)}>
                    <img
                      src={`${API_BASE_URL}${order.paymentScreenshot}`}
                      alt="Payment proof"
                      className="w-12 h-12 object-cover rounded-md border border-gray-200 hover:opacity-80"
                    />
                  </button>
                </td>
                <td className="py-2 pr-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order, e.target.value)}
                    className={`px-2 py-1 rounded-md text-xs font-semibold border-0 ${statusColors[order.status]}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="text-gray-500 py-6 text-center">No orders yet.</p>}
      </div>

      {previewImg && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPreviewImg(null)}
        >
          <img src={previewImg} alt="Payment proof" className="max-w-[90vw] max-h-[90vh] rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
