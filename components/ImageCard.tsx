import React from 'react';

interface ImageCardProps {
    imageUrl: string;
    title: string;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);


export const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, title }) => {
    const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Ngăn các sự kiện click khác
        const link = document.createElement('a');
        link.href = imageUrl;
        // Tạo tên tệp an toàn và dễ đọc
        const fileName = `chan-dung-giang-sinh-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="group relative overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover aspect-square" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                 <div className="p-4 flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg">{title}</h3>
                    <button
                        onClick={handleDownload}
                        className="p-2 bg-white/20 rounded-full text-white hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                        aria-label="Tải ảnh xuống"
                        title="Tải ảnh xuống"
                    >
                        <DownloadIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};