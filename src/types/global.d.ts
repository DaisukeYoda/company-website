// Google Analytics カスタム関数の型定義
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    trackEvent?: (eventName: string, parameters?: Record<string, any>) => void;
    trackFormSubmission?: (formType: string, method?: string) => void;
    trackExternalLink?: (url: string, linkText: string) => void;
    trackDownload?: (fileName: string, fileType: string) => void;
    trackScrollDepth?: () => void;
    trackEngagement?: () => void;
  }
}

export {};