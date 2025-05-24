declare module '*.json' {
  const value: {
    common: {
      navigation: {
        product: string
        pricing: string
        documentation: string
        signIn: string
        getStarted: string
      }
      cta: {
        tryPro: string
        startFreeTrial: string
        learnMore: string
      }
      footer: {
        company: string
        product: string
        resources: string
        community: string
        legal: string
      }
    }
    home: {
      hero: {
        title: string
        subtitle: string
        description: string
      }
      features: {
        title: string
        performance: {
          title: string
          description: string
        }
        openSource: {
          title: string
          description: string
        }
        costEffective: {
          title: string
          description: string
        }
      }
    }
  }
  export default value
} 