import React, { useState } from 'react';
import { toast } from 'react-toastify';
import OrderService from '@services/order.service';

const ReviewPopup = ({ order, onClose, onSuccess, customerId }) => {
    const [reviews, setReviews] = useState(
        order.orderDetails.map((item) => ({
            product: { id: item.product.id },
            comment: '',
            rating: 0,
            customer: { id: customerId },
            orderId: order.id,
        })),
    );

    const handleChange = (index, key, value) => {
        const newReviews = [...reviews];
        newReviews[index][key] = value;
        setReviews(newReviews);
    };

    const handleSubmit = async () => {
        try {
            const response = await OrderService.addReview(reviews);
            console.log(response);
            if (response.data.success) {
                toast.success('Đánh giá thành công!');
                onClose();
                onSuccess?.();
            }
        } catch (error) {
            toast.error('Đánh giá thất bại!');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto max-h-[80vh]">
                <h2 className="text-2xl font-semibold mb-4 text-center">Đánh giá đơn hàng</h2>

                {order.orderDetails.map((item, idx) => (
                    <div key={idx} className="border-b pb-4 mb-4 flex gap-4 items-start">
                        <img
                            src={item.product.thumbnail || '/placeholder.png'}
                            alt={item.product.name}
                            className="w-24 h-36  object-cover rounded-md"
                        />

                        <div className="flex-1">
                            <h3 className="font-semibold">{item.product.name}</h3>

                            {/* Star rating */}
                            <div className="flex gap-2 mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleChange(idx, 'rating', star)}
                                        className={`text-2xl transition-colors ${
                                            star <= reviews[idx].rating ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>

                            <textarea
                                value={reviews[idx].comment}
                                onChange={(e) => handleChange(idx, 'comment', e.target.value)}
                                placeholder="Viết nhận xét..."
                                className="w-full border rounded-md px-3 py-2 mt-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                ))}

                <div className="flex justify-end gap-3 mt-4">
                    <button onClick={onClose} className="px-4 py-2 rounded-md border hover:bg-gray-100 transition">
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
                    >
                        Gửi đánh giá
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewPopup;
