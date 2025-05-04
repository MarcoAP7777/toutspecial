module.exports = {
  googleAnalytics: {
    trackingId: process.env.NEXT_PUBLIC_GA_ID,
    anonymizeIp: true,
    respectDNT: true,
  },
  hotjar: {
    hjid: process.env.NEXT_PUBLIC_HOTJAR_ID,
    hjsv: 6,
  },
  amplitude: {
    apiKey: process.env.NEXT_PUBLIC_AMPLITUDE_KEY,
  },
  tracking: {
    pageViews: true,
    events: true,
    errors: true,
    performance: true,
  },
  privacy: {
    cookieConsent: true,
    gdprCompliant: true,
  },
};
