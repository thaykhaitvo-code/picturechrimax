import React from 'react';
import { ImageCard } from './ImageCard';
import { Spinner } from './Spinner';

interface ImageGalleryProps {
    images: { url: string; title: string }[];
    isLoading: boolean;
    error: string | null;
}

const Placeholder = () => (
    <div className="relative w-full aspect-square bg-gray-700/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
        <svg className="w-1/4 h-1/4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    </div>
);


export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isLoading, error }) => {
    return (
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-700 min-h-[500px] flex flex-col">
            <h2 className="font-christmas text-4xl text-center text-white mb-6">Chân Dung Diệu Kỳ Của Bạn</h2>
            
            {error && (
                <div className="m-auto text-center p-4 bg-red-900/50 border border-red-700 rounded-lg">
                    <h3 className="text-red-300 font-bold">Đã Xảy Ra Lỗi</h3>
                    <p className="text-red-400">{error}</p>
                </div>
            )}
            
            {!error && isLoading && (
                 <div className="m-auto text-center">
                    <Spinner />
                    <p className="text-lg text-gray-300 mt-4 animate-pulse">Đang tạo những hình ảnh lễ hội của bạn...</p>
                    <p className="text-sm text-gray-400 mt-2">Việc này có thể mất một chút thời gian. Điều tốt đẹp sẽ đến với những người biết chờ đợi!</p>
                 </div>
            )}

            {!error && !isLoading && images.length === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-auto w-full">
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                </div>
            )}

            {!error && !isLoading && images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {images.map((image, index) => (
                        <ImageCard key={index} imageUrl={image.url} title={image.title} />
                    ))}
                </div>
            )}
        </div>
    );
};