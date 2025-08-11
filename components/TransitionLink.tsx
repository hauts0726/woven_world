'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, MouseEvent } from 'react';
import { usePageTransition } from './PageTransition';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function TransitionLink({ href, children, className }: TransitionLinkProps) {
  const router = useRouter();
  const { startTransition, isTransitioning } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (isTransitioning) return;
    
    // フェードアウト開始
    startTransition();
    
    // フェードアウト完了後にナビゲーション
    setTimeout(() => {
      router.push(href);
    }, 2000); // 2秒かけてゆっくりとフェードアウト
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
