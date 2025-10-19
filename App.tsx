import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { ImageGallery } from './components/ImageGallery';
import { generateChristmasImages } from './services/geminiService';
import { OUTFIT_OPTIONS, SCENE_OPTIONS, ART_STYLES } from './constants';
import type { Outfit, Scene } from './types';
import { fileToBase64 } from './utils/fileUtils.tsx';

const App: React.FC = () => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [outfit, setOutfit] = useState<Outfit>(OUTFIT_OPTIONS[0]);
    const [scene, setScene] = useState<Scene>(SCENE_OPTIONS[0]);
    const [description, setDescription] = useState<string>('Chủ thể đang cười ấm áp.');
    const [generatedImages, setGeneratedImages] = useState<{ url: string; title: string }[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);

    const handleImageUpload = useCallback((file: File) => {
        setUploadedImageFile(file);
        fileToBase64(file).then(base64 => {
            setUploadedImage(base64);
        });
    }, []);
    
    const handleGenerate = useCallback(async () => {
        if (!uploadedImageFile) {
            setError('Vui lòng tải ảnh lên trước.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImages([]);

        try {
            const results = await generateChristmasImages(uploadedImageFile, outfit, scene, description);
            const styledResults = results.map((url, index) => ({
              url,
              title: ART_STYLES[index]
            }));
            setGeneratedImages(styledResults);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định.');
        } finally {
            setIsLoading(false);
        }
    }, [uploadedImageFile, outfit, scene, description]);

    return (
        <div className="min-h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://picsum.photos/seed/christmas/1920/1080')"}}>
            <div className="min-h-screen bg-gray-900 bg-opacity-80 backdrop-blur-sm">
                <Header />
                <main className="container mx-auto p-4 md:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-4">
                            <Controls
                                onImageUpload={handleImageUpload}
                                uploadedImage={uploadedImage}
                                outfit={outfit}
                                setOutfit={setOutfit}
                                scene={scene}
                                setScene={setScene}
                                description={description}
                                setDescription={setDescription}
                                onGenerate={handleGenerate}
                                isLoading={isLoading}
                            />
                        </div>
                        <div className="lg:col-span-8">
                            <ImageGallery 
                                images={generatedImages} 
                                isLoading={isLoading}
                                error={error}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;