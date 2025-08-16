import React from 'react';

const ConfirmCancelPopup = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[300px] text-center">
                <h3 className="text-lg font-semibold mb-4">Bạn có chắc muốn hủy đơn?</h3>
                <div className="flex justify-center gap-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Hủy
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmCancelPopup;
