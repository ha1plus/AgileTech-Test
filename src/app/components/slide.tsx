'use client';

import { useState, useEffect } from 'react';
import useAxiosInstance from "@/tools/api";

interface Slide {
    id: number;
    imageUrl: string;
    desctiption: string;
}

export default function Slideshow() {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const axiosInstance = useAxiosInstance();

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchSlides = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/galleries');
                setSlides(response.data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
            setLoading(false);
            }
        };
    
        fetchSlides();
    }, []);

   
    return (
        <section className="container mx-auto my-20">
            <div className='bg-3 py-44 px-14 rounded-3xl relative'>
                <h2 className='text-white text-4xl font-bold mb-[80px]'>Testimonials</h2>

                <button onClick={prevSlide} className="absolute left-4 top-[450px] transform -translate-y-1/2 rounded-full">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-white'>
                        <path d="M26 15H4M10 9L4 15L10 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <button onClick={nextSlide} className="absolute right-4 top-[450px] transform -translate-y-1/2 rounded-full">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-white'>
                        <path d="M4 15H26M20 9L26 15L20 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Centered Three Dots Overlay */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                    ></div>
                ))}
                </div>

                <div className="relative w-full h-80 overflow-hidden">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        slides.map((slide, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <div className='bg-white rounded-3xl w-full h-full flex items-center justify-center px-4 text-1'>
                                        <p className='text-black'>{slide.desctiption}</p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
}
