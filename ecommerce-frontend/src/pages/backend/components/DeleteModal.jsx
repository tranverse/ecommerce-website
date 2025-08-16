import React from 'react';
import ReactModal from 'react-modal';
import { IoCloseCircleOutline, IoClose } from 'react-icons/io5';

const DeleteModal = ({ deleteModal, setDeleteModal, itemName, onConfirm }) => {
    return (
        <ReactModal
            isOpen={deleteModal}
            onRequestClose={() => setDeleteModal(false)}
            contentLabel="Delete Confirmation"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                content: {
                    position: 'static',
                    maxWidth: '400px',
                    maxHeight: '300px',
                    borderRadius: '12px',
                    padding: '20px',
                    overflow: 'auto',
                },
            }}
        >
            <button
                onClick={() => setDeleteModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
            >
                <IoClose size={24} />
            </button>

            <div className="flex justify-center mb-4">
                <IoCloseCircleOutline className="text-red-600" size={64} />
            </div>

            <h2 className="text-center text-lg font-semibold mb-6">
                <span className="font-bold">{itemName}</span> ?
            </h2>

            <div className="flex justify-center gap-6">
                <button
                    onClick={() => {
                        onConfirm();
                        setDeleteModal(false);
                    }}
                    className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    Có
                </button>
                <button
                    onClick={() => setDeleteModal(false)}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                >
                    Không
                </button>
            </div>
        </ReactModal>
    );
};

export default DeleteModal;
