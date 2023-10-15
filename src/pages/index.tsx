import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import { BlogAnalytics } from './api/analytics/BlogAnalytics';

export default function Home() {
  const blogAnalytics = new BlogAnalytics();
  const router = useRouter();

  useEffect(() => {
    blogAnalytics.trackPageVisit(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    const start = Date.now();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const elapsed = (Date.now() - start)/ 1000;
        console.log('Tempo gasto (segundos): ', elapsed);

        blogAnalytics.setTrafficSource('search engine');
        blogAnalytics.recordTimeSpentOnPage('home', elapsed); // tempo em segundos
        blogAnalytics.setIPAddress('192.168.0.1');
        blogAnalytics.setBrowserInfo('Chrome 94.0');
        blogAnalytics.trackUserAction('clicked button');
        blogAnalytics.addCampaignReference('campaign1');
        blogAnalytics.setConversionBehavior('newsletter signup', true);

        blogAnalytics.sendAnalyticsData(); // Chame essa função para enviar os dados de analytics para o servidor
      }
    };

    const handleBeforeUnload = (event: any) => {
      handleVisibilityChange();
      delete event['returnValue'];
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[100vh]">
        <HeroSection />
      </main>
      <Footer />
    </>
  );
}
