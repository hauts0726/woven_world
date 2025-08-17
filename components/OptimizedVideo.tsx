'use client';

import React, { useEffect, useRef, useState } from 'react';

type Props = {
  /** Cloudinaryのベース動画URL（変換パラメータなしでもOK） */
  src: string;
  /** できればCloudinaryの静止画を指定（f_auto,q_auto,w_**** 推奨） */
  poster: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
};

const supportsReducedData = () =>
  typeof window !== 'undefined' &&
  (window as any).navigator &&
  // @ts-ignore
  (navigator as any).connection &&
  // @ts-ignore
  ((navigator as any).connection.saveData || false);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const buildUrl = (
  base: string,
  { width }: { width: number }
) => {
  // Cloudinaryの変換パラメータを差し込むヘルパ
  // 形式: https://res.cloudinary.com/<cloud>/video/upload/<TRANSFORMS>/v12345/xxx
  // 既に `/video/upload/` を含む想定
  const TRANSFORMS_HQ = 'f_auto,q_auto:good,vc_auto,br_auto,w_1920,h_1080,c_fill';
  const TRANSFORMS_MQ = 'f_auto,q_auto:eco,vc_auto,br_auto,w_1280,h_720,c_fill';
  const TRANSFORMS_LQ = 'f_auto,q_auto:low,vc_auto,br_auto,w_960,h_540,c_fill';

  const transforms =
    width >= 1600 ? TRANSFORMS_HQ :
    width >= 1000 ? TRANSFORMS_MQ :
    TRANSFORMS_LQ;

  return base.replace('/video/upload/', `/video/upload/${transforms}/`);
};

export default function OptimizedVideo({
  src,
  poster,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [hqReady, setHqReady] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 可視時に読み込み開始
  useEffect(() => {
    if (!videoRef.current) return;

    const el = videoRef.current;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((e) => e.isIntersecting);
        if (isIntersecting) {
          setShouldLoad(true);
          observerRef.current?.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    observerRef.current.observe(el);

    return () => observerRef.current?.disconnect();
  }, []);

  // ネットワーク/ユーザー設定によっては読み込みスキップ
  const skipVideo =
    supportsReducedData() || prefersReducedMotion();

  // LQ→HQの段階的読み込み
  useEffect(() => {
    if (!shouldLoad || skipVideo) return;
    const width = window.innerWidth || 1280;

    // まず軽いURLで素早く開始
    const lqUrl = buildUrl(src, { width: Math.min(width, 960) });
    setVideoUrl(lqUrl);

    const loadHq = () => {
      // 余力のあるタイミングでHQに差し替える
      const hqUrl = buildUrl(src, { width: Math.max(width, 1280) });
      const preloader = document.createElement('video');
      preloader.preload = 'auto';
      preloader.src = hqUrl;
      preloader.muted = true;

      preloader.addEventListener('canplaythrough', () => {
        setHqReady(true);
        setVideoUrl(hqUrl);
      });
      // 読み込み開始
      preloader.load();
    };

    // 可能ならアイドル時に
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadHq, { timeout: 2500 });
    } else {
      // 少し遅らせて実行
      const t = setTimeout(loadHq, 1200);
      return () => clearTimeout(t);
    }
  }, [shouldLoad, skipVideo, src]);

  // タブが非表示のときは停止
  useEffect(() => {
    const onVisibility = () => {
      if (!videoRef.current) return;
      if (document.hidden) videoRef.current.pause();
      else if (autoPlay && shouldLoad && !skipVideo) {
        videoRef.current.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [autoPlay, shouldLoad, skipVideo]);

  // 低データ/低モーションならposterのみ
  if (skipVideo) {
    return (
      <div className={className}>
        {/* posterを背景として出す場合 */}
        <img
          src={poster}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      // 初期は読み込まない
      preload="none"
      // iOSでの自動再生要件
      muted={muted}
      playsInline={playsInline}
      // 自動再生は可視化後に try
      autoPlay={false}
      loop={loop}
      poster={poster}
      onCanPlay={() => {
        // 初回再生を試みる
        if (autoPlay) {
          videoRef.current?.play().catch(() => {});
        }
      }}
      // 右クリックメニューのダウンロードやピクチャインピクチャを抑制（任意）
      controls={false}
      controlsList="nodownload noplaybackrate"
      disablePictureInPicture
    >
      {/* 動的に差し替える本体ソース */}
      {videoUrl ? <source src={videoUrl} /> : null}
    </video>
  );
}
