import BannerService from '@services/banner.service';
import React, { useEffect, useState } from 'react';
import { DateTimeFormat } from '@utils/NumberFomart';
import CheckBox from '@components/CheckBox';
import { Link } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa';
import { TbCheckupList } from 'react-icons/tb';
import { MdOutlineDelete } from 'react-icons/md';
const BannerList = () => {
    const [banners, setBanners] = useState([]);
    const getAllBanners = async () => {
        const response = await BannerService.getAllBanner();
        if (response.data.success) {
            setBanners(response.data.data);
        }
    };

    useEffect(() => {
        getAllBanners();
    }, []);

    return (
        <div className="p-4">
            {banners.length === 0 ? (
                <p className="text-gray-500 text-center">Chưa có banner nào.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4  text-center">#</th>
                                <th className="py-2 px-4  text-center">Hình ảnh</th>
                                <th className="py-2 px-4  text-center">Link</th>
                                <th className="py-2 px-4  text-center">Thời gian</th>
                                <th className="py-2 px-4  text-center">Độ ưu tiên</th>
                                <th className="py-2 px-4  text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners.map((banner, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 ">{index + 1}</td>
                                    <td className="py-2 px-4 ">
                                        {banner.imgUrl ? (
                                            <img
                                                src={banner.imgUrl}
                                                alt={`Banner ${index + 1}`}
                                                className="w-32 h-auto rounded"
                                            />
                                        ) : (
                                            'N/A'
                                        )}
                                    </td>
                                    <td className="py-2 px-4 ">
                                        {banner.link ? (
                                            <a
                                                href={banner.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                {banner.link}
                                            </a>
                                        ) : (
                                            'N/A'
                                        )}
                                    </td>
                                    <td className="py-2 px-4 ">
                                        {DateTimeFormat(banner.startDate) || 'N/A'} - {DateTimeFormat(banner.endDate) || 'N/A'}
                                    </td>

                                    <td className="py-2 px-4 text-center">{banner.priority ?? 'N/A'}</td>
                                    <td className="    ">
                                        <div className="flex gap-1 items-center justify-center">
                                            <Link to={`/user/view-banner/${banner.id}`}>
                                                <FaRegEye className="cursor-pointer text-[var(--primary)] text-lg  " />
                                            </Link>
                                            <Link to={`/user/update-banner/${banner?.id}`}>
                                                <TbCheckupList className="cursor-pointer text-[var(--primary)] text-lg  " />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BannerList;
