import axios, { AxiosError, AxiosResponse } from "axios"; // Importe o axios no início do seu arquivo

export class BlogAnalytics {
  private static instance: BlogAnalytics;
  private axiosInstance = axios.create(); // Cria uma instância única do axios

  private constructor() {}

  public static getInstance(): BlogAnalytics {
    if (!BlogAnalytics.instance) {
      BlogAnalytics.instance = new BlogAnalytics();
    }
    return BlogAnalytics.instance;
  }

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
      pagevisited: this.pagesVisited,
      trafficsource: this.trafficSource,
      timespentonpages: this.timeSpentOnPages,
      userip: this.userIP,
      browserinfo: this.browserInfo,
      useraction: this.userActions,
      campaignreference: this.campaignReferences,
      conversionbehavior: this.conversionBehavior,
    };

    this.axiosInstance
      .post("/api/analytics", analyticsData)
      .then((response: AxiosResponse) => {
        // Lidar com a resposta do servidor, se necessário
        console.log("Dados de analytics enviados com sucesso:", response.data);
      })
      .catch((error: AxiosError) => {
        // Lidar com erros de requisição, se necessário
        if (error.response) {
          console.error("Erro de resposta do servidor:", error.response.data);
        } else if (error.request) {
          console.error("Erro de requisição:", error.request);
        } else {
          console.error("Erro:", error.message);
        }
      });
  }
}
