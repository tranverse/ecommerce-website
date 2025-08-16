import { toast } from 'react-toastify';
import BannerForm from './BannerForm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BannerService from '@services/banner.service';

export const AddBanner =  () => {
    const handleAdd = async (payload, reset) => {
        const response = await BannerService.addBanner(payload);
        if (response.data.success) {
            toast.success(response.data.message);
            reset('');
        } else {
            toast.success(response.data.message);
        }
    };

    return <BannerForm onSubmit={handleAdd} />;
};

export const ViewBanner = () => {
    const [banner, setBanner] = useState(null);
    const { bannerId } = useParams();
    const getBanner = async () => {
        const response = await BannerService.getBannerById(bannerId);
        if (response.data.success) {
            setBanner(response.data.data);
            return true;
        } else {
            toast.success(response.data.message);
            return false;
        }
    };
    useEffect(() => {
        getBanner();
    }, [bannerId]);

    return <BannerForm onSubmit={() => {}} initialValues={banner} isView={true} />;
};

export const UpdateBanner = () => {
    const [banner, setBanner] = useState(null);
    const { bannerId } = useParams();
    const getBanner = async () => {
        const response = await BannerService.getBannerById(bannerId);
        if (response.data.success) {
            setBanner(response.data.data);
            return true;
        } else {
            toast.success(response.data.message);
            return false;
        }
    };
    useEffect(() => {
        getBanner();
    }, [bannerId]);

    const handleUpdate = async (payload) => {
        const response = await BannerService.updateBanner(bannerId, payload);
        if (response.data.success) {
            toast.success(response.data.message);
            return true;
        } else {
            toast.success(response.data.message);
            return false;
        }
    };

    return <BannerForm onSubmit={handleUpdate} initialValues={banner} isView={false} />;
};
