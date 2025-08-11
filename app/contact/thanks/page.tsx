'use client';

import Link from 'next/link';

export default function ContactThanksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 whitespace-nowrap">
            お問い合わせありがとうございました
          </h1>
          <div className="w-24 h-px bg-gray-900/20 mx-auto mb-12"></div>
          <div className="space-y-6">
            <p className="text-lg text-gray-700/80 leading-8">
              お問い合わせいただき、誠にありがとうございます。
            </p>
            <p className="text-lg text-gray-700/80 leading-8">
              いただいたメッセージは確認次第、順次ご返信させていただきます。
            </p>
            <p className="text-base text-gray-600/70 leading-7 mt-8">
              通常、2-3営業日以内にご返信いたします。
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/"
            className="inline-block w-full sm:w-auto min-w-[200px] py-4 px-8 bg-gray-900/90 text-white font-medium rounded-md hover:bg-gray-900 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl text-center"
          >
            TOPページに戻る
          </Link>
          <Link
            href="/contact"
            className="inline-block w-full sm:w-auto min-w-[200px] py-4 px-8 border border-gray-300/60 text-gray-700 font-medium rounded-md hover:bg-gray-50/80 hover:border-gray-400/60 transition-all duration-300 backdrop-blur-sm text-center"
          >
            お問い合わせページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
