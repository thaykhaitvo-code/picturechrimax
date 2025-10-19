import React from 'react';
import { OUTFIT_OPTIONS, SCENE_OPTIONS } from '../constants';
import type { Outfit, Scene } from '../types';

interface ControlsProps {
    onImageUpload: (file: File) => void;
    uploadedImage: string | null;
    outfit: Outfit;
    setOutfit: (outfit: Outfit) => void;
    scene: Scene;
    setScene: (scene: Scene) => void;
    description: string;
    setDescription: (description: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const MagicWandIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-5.247-8.995l10.494 4.998-10.494-4.998zm0 0l10.494-4.998m-10.494 4.998L3.253 9.75M12 6.253L20.747 9.75m-8.747-3.497L9.253 3.25" />
    </svg>
);


export const Controls: React.FC<ControlsProps> = ({
    onImageUpload,
    uploadedImage,
    outfit,
    setOutfit,
    scene,
    setScene,
    description,
    setDescription,
    onGenerate,
    isLoading
}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onImageUpload(e.target.files[0]);
        }
    };

    return (
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-700 space-y-6">
            <div>
                <label className="block text-sm font-medium text-green-300 mb-2 font-christmas text-2xl">1. Tải Ảnh Của Bạn</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        {uploadedImage ? (
                            <img src={`data:image/jpeg;base64,${uploadedImage}`} alt="Uploaded preview" className="mx-auto h-32 w-32 object-cover rounded-full shadow-lg"/>
                        ) : (
                            <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                        <div className="flex text-sm text-gray-400">
                             <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-green-400 hover:text-green-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-green-500 px-3 py-1 my-2">
                                <UploadIcon />
                                <span>{uploadedImage ? 'Đổi tệp' : 'Chọn một tệp'}</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                            </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF tối đa 10MB</p>
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="outfit" className="block text-sm font-medium text-red-300 mb-2 font-christmas text-2xl">2. Chọn Trang Phục</label>
                <select id="outfit" value={outfit} onChange={(e) => setOutfit(e.target.value as Outfit)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md text-white">
                    {OUTFIT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
            </div>

            <div>
                <label htmlFor="scene" className="block text-sm font-medium text-yellow-300 mb-2 font-christmas text-2xl">3. Chọn Bối Cảnh</label>
                <select id="scene" value={scene} onChange={(e) => setScene(e.target.value as Scene)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 border-gray-600 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md text-white">
                    {SCENE_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
            </div>

             <div>
                <label htmlFor="description" className="block text-sm font-medium text-blue-300 mb-2 font-christmas text-2xl">4. Thêm Chi Tiết</label>
                <textarea id="description" rows={3} value={description} onChange={e => setDescription(e.target.value)} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm bg-gray-700 border-gray-600 rounded-md text-white" placeholder="ví dụ: đang cầm một tách ca cao nóng, đội mũ Ông già Noel..."></textarea>
            </div>

            <div>
                <button
                    type="button"
                    onClick={onGenerate}
                    disabled={isLoading || !uploadedImage}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-bold text-gray-900 bg-gradient-to-r from-green-400 to-red-500 hover:from-green-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    {isLoading ? (
                        <>
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           Đang tạo phép màu Giáng sinh...
                        </>
                    ) : (
                        <>
                            <MagicWandIcon />
                            Tạo Chân Dung
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};