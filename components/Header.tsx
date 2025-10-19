import React from 'react';

const RoseIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block ml-2 text-red-400" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12.012,21.432l-1.45-1.32C5.4,15.36,2,12.28,2,8.5C2,5.42,4.42,3,7.5,3c1.74,0,3.41.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12.012,21.432z" clipRule="evenodd"/>
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 
                        className="font-christmas text-5xl md:text-6xl font-bold tracking-wider drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]"
                    >
                       <span className="bg-gradient-to-r from-red-500 via-yellow-300 to-green-400 text-transparent bg-clip-text">
                         AI Chân Dung Giáng Sinh
                       </span>
                    </h1>
                    <p className="mt-2 font-christmas text-2xl italic text-gray-200 flex items-center">
                        Thầy Khái yêu công nghệ
                        <RoseIcon />
                    </p>
                </div>
            </div>
        </header>
    );
};