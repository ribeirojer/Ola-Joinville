import axios from 'axios'; // Importe o axios no início do seu arquivo

export class BlogAnalytics {
  private pagesVisited: string[] = [];
  private trafficSource: string = "";
  private timeSpentOnPages: Record<string, number> = {};
  private userIP: string = "";
  private browserInfo: string = "";
  private userActions: string[] = [];
  private campaignReferences: string[] = [];
  private conversionBehavior: Record<string, boolean> = {};

  trackPageVisit(page: string) {
    this.pagesVisited.push(page);
  }

  setTrafficSource(source: string) {
    this.trafficSource = source;
  }

  recordTimeSpentOnPage(page: string, time: number) {
    this.timeSpentOnPages[page] = time;
  }

  setIPAddress(ip: string) {
    this.userIP = ip;
  }

  setBrowserInfo(info: string) {
    this.browserInfo = info;
  }

  trackUserAction(action: string) {
    this.userActions.push(action);
  }

  addCampaignReference(reference: string) {
    this.campaignReferences.push(reference);
  }

  setConversionBehavior(action: string, converted: boolean) {
    this.conversionBehavior[action] = converted;
  }
  
  sendAnalyticsData() {
    const analyticsData = {
      pagesVisited: this.pagesVisited,
      trafficSource: this.trafficSource,
      timeSpentOnPages: this.timeSpentOnPages,
      userIP: this.userIP,
      browserInfo: this.browserInfo,
      userActions: this.userActions,
      campaignReferences: this.campaignReferences,
      conversionBehavior: this.conversionBehavior
    };
	console.log(analyticsData)

      axios.post('/api/analytics', analyticsData)
        .then(response => {
          // Lidar com a resposta do servidor, se necessário
        })
        .catch(error => {
          // Lidar com erros de requisição, se necessário
          console.error('Erro ao enviar os dados:', error);
        });
  }
}
