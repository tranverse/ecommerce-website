import ProductService from '@services/product.service';
import ProductForm from './ProductForm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AddProduct = () => {
    const handleAdd = async (payload) => {
        const res = await ProductService.addProduct(payload);
        if (res.data.success) {
            toast.success(res.data.message);
            return true;
        } else {
            toast.error(res.data.message);
            return false;
        }
    };

    return <ProductForm onSubmit={handleAdd} isView={false} />;
};

export const UpdateProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await ProductService.getProduct(productId);
                if (res.data.success) {
                    setProduct(res.data.data);
                } else {
                    toast.error('Failed to load product data');
                }
            } catch {
                toast.error('Error loading product');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleUpdate = async (payload) => {
        const res = await ProductService.updateProduct(productId, payload);
        console.log(res);
        if (res.data.success) {
            toast.success(res.data.message);
            setProduct(res.data.data);
            return true; // để ProductForm reset form nếu cần
        } else {
            toast.error(res.data.message);
            return false;
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return <ProductForm initialValues={product} onSubmit={handleUpdate} isView={false} />;
};

// ViewProduct
export const ViewProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await ProductService.getProduct(productId);
                if (res.data.success) {
                    setProduct(res.data.data);
                } else {
                    toast.error('Failed to load product data');
                }
            } catch {
                toast.error('Error loading product');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return <ProductForm initialValues={product} onSubmit={() => {}} isView={true} />;
};
