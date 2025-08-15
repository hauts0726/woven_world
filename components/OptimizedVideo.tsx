'use client';

import { useEffect, useRef, useState } from 'react';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export default function OptimizedVideo({
  src,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      if (autoPlay) {
        video.play().catch((error) => {
          console.warn('Video autoplay failed:', error);
        });
      }
    };

    const handleError = () => {
      setHasError(true);
      console.error('Video failed to load');
    };

    const handleCanPlay = () => {
      // 動画が再生可能になったら最適化設定を適用
      video.style.objectFit = 'cover';
      video.style.objectPosition = 'center center';
      
      // 高品質動画のための設定
      if (video.videoWidth > 1920) {
        // 高解像度動画の場合、シャープネスを保持
        video.style.imageRendering = 'crisp-edges';
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded && !hasError) {
            video.load();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
      observer.disconnect();
    };
  }, [autoPlay, isLoaded, hasError]);

  if (hasError) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <div className="text-center text-gray-500">
          <p>動画を読み込めませんでした</p>
          {poster && (
            <img 
              src={poster} 
              alt="Video poster" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload="metadata"
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Loading overlay */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
            <p className="text-gray-600 japanese-text">動画を読み込み中...</p>
          </div>
        </div>
      )}
    </>
  );
}
