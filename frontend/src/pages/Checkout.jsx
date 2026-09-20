import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../config';
import paymentQr from '../assets/payment-qr.jpg';

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [placed, setPlaced] = useState(false);

  const [form, setForm] = useState({
    buyerName: '',
    phone: '',
    email: '',
    address: '',
    quantity: 1,
  });
  const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Book not found');
        return res.json();
      })
      .then(setBook)
      .catch(() => setError('This book could not be found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!screenshot) {
      setSubmitError('Please upload a screenshot of your payment.');
      return;
    }
    setSubmitting(true);
    setSubmitError('');

    try {
      const data = new FormData();
      data.append('bookId', book._id);
      data.append('buyerName', form.buyerName);
      data.append('phone', form.phone);
      data.append('email', form.email);
      data.append('address', form.address);
      data.append('quantity', form.quantity);
      data.append('paymentScreenshot', screenshot);

      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to place order');
      setPlaced(true);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <p className="text-center py-20 text-gray-500">Loading...</p>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="text-center py-20">
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/shop" className="text-indigo-600 hover:underline">Back to shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (placed) {
    return (
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
          <div className="bg-gray-50 rounded-xl shadow-lg p-10 text-center max-w-md">
            <h1 className="text-3xl font-bold mb-4 text-blue-900">Order Received!</h1>
            <p className="mb-6 text-blue-800">
              We've received your order for <strong>{book.title}</strong>. We'll verify your
              payment and get in touch to confirm delivery.
            </p>
            <Link to="/shop" className="text-indigo-600 hover:underline font-semibold">
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const hasDiscount = book.discountPercent > 0;
  const quantity = Math.max(1, parseInt(form.quantity, 10) || 1);
  const unitPrice = hasDiscount ? book.price * (1 - book.discountPercent / 100) : book.price;
  const total = (unitPrice * quantity).toFixed(0);

  const coverSrc = book.coverImage
    ? book.coverImage.startsWith('http')
      ? book.coverImage
      : `${API_BASE_URL}${book.coverImage}`
    : null;

  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-10 py-10 bg-white/80">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Book summary + QR */}
          <div className="bg-white border border-blue-100 shadow-lg rounded-xl p-6">
            <div className="flex gap-4 items-start mb-6">
              {coverSrc && (
                <img src={coverSrc} alt={book.title} className="w-24 h-32 object-cover rounded-md" />
              )}
              <div>
                <h2 className="text-xl font-bold text-blue-900">{book.title}</h2>
                {book.author && <p className="text-sm text-gray-500">{book.author}</p>}
                <p className="mt-2 text-lg font-bold text-red-600">Rs. {unitPrice.toFixed(0)}</p>
                <p className="text-sm text-gray-500">{book.stock} in stock</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-blue-900 mb-2 text-center">
              Scan &amp; Pay
            </h3>
            <div className="flex justify-center mb-3">
              <img
                src={paymentQr}
                alt="Payment QR Code - Books Writing Nepal"
                className="w-64 h-auto border border-blue-100 rounded-lg shadow-sm object-contain bg-white p-2"
              />
            </div>
            <p className="text-center text-sm text-gray-500">
              Scan the QR code, pay Rs. {total} and upload your payment screenshot below.
            </p>
          </div>

          {/* Buyer form */}
          <div className="bg-white border border-blue-100 shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4 text-center">Delivery Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-blue-900 font-medium mb-1">Full Name</label>
                <input
                  name="buyerName"
                  value={form.buyerName}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-blue-200 rounded-md"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-blue-900 font-medium mb-1">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="98XXXXXXXX"
                    className="w-full px-4 py-2 border border-blue-200 rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-blue-900 font-medium mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-blue-200 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-blue-900 font-medium mb-1">Delivery Address</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="Your Address"
                  className="w-full px-4 py-2 border border-blue-200 rounded-md"
                />
              </div>
              <div>
                <label className="block text-blue-900 font-medium mb-1">Quantity</label>
                <input
                  name="quantity"
                  type="number"
                  min={1}
                  max={book.stock}
                  value={form.quantity}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-blue-200 rounded-md"
                />
              </div>
              <div>
                <label className="block text-blue-900 font-medium mb-1">Payment Screenshot</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setScreenshot(e.target.files[0])}
                  required
                  className="w-full px-4 py-2 border border-blue-200 rounded-md bg-white"
                />
              </div>

              <div className="text-right font-semibold text-blue-900">Total: Rs. {total}</div>

              {submitError && <p className="text-red-600 text-sm">{submitError}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 rounded-md font-semibold hover:from-blue-700 hover:to-green-700 disabled:opacity-60"
              >
                {submitting ? 'Placing Order...' : 'Confirm Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
