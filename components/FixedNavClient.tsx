'use client';

import { usePathname } from 'next/navigation';
import SimpleNavButtons from '@/components/SimpleNavButtons';

export default function FixedNavClient() {
  const pathname = usePathname();
  // ホーム（"/"）のときだけ表示。必要なら条件を追加（例: '/ja'）。
  if (pathname !== '/') return null;
  return <SimpleNavButtons />;
}
