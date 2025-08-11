'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // 送信成功時はサンクスページに遷移
        router.push('/contact/thanks');
      } else {
        setSubmitMessage('送信に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      setSubmitMessage('送信に失敗しました。もう一度お試しください。');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">お問い合わせ</h1>
          <div className="w-24 h-px bg-gray-900/20 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700/80 leading-relaxed">
            展覧会に関するご質問やご意見がございましたら、お気軽にお問い合わせください。
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm shadow-xl border border-gray-200/50 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900/90 mb-3">
                お名前 *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300/60 rounded-md focus:ring-2 focus:ring-gray-400/50 focus:border-gray-400/60 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-500/70"
                placeholder="お名前を入力してください"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900/90 mb-3">
                メールアドレス *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300/60 rounded-md focus:ring-2 focus:ring-gray-400/50 focus:border-gray-400/60 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-500/70"
                placeholder="メールアドレスを入力してください"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-900/90 mb-3">
                メッセージ *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300/60 rounded-md focus:ring-2 focus:ring-gray-400/50 focus:border-gray-400/60 transition-all duration-300 resize-vertical bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-500/70"
                placeholder="メッセージを入力してください"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-md font-medium transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-400/80 cursor-not-allowed text-white/90'
                    : 'bg-gray-900/90 hover:bg-gray-900 focus:ring-2 focus:ring-gray-400/50 focus:ring-offset-2 text-white shadow-lg hover:shadow-xl backdrop-blur-sm'
                }`}
              >
                {isSubmitting ? '送信中...' : 'メッセージを送信'}
              </button>
            </div>

            {submitMessage && (
              <div className="p-4 rounded-md border border-gray-300/60 bg-gray-50/80 backdrop-blur-sm">
                <p className="text-gray-700/90 text-center">{submitMessage}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
