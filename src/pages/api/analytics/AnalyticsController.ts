import { supabase } from "../../../lib/supabase";

type AnalyticsDataType = {
  id: number;
  pagevisited?: string | null;
  trafficsource?: string | null;
  timespentonpages?: { [page: string]: number } | null;
  userip?: string | null;
  browserinfo?: string | null;
  useraction?: string | null;
  campaignreference?: string | null;
  conversionbehavior?: { [action: string]: boolean } | null;
};

const trackEvent = async (data: AnalyticsDataType) => {
  try {
    const { data: responseData, error } = await supabase.from('bloganalytics').insert([data]).select();

    if (error) {
      console.error('Erro ao registrar evento de analytics:', error);
    } else {
      console.log('Evento de analytics registrado com sucesso:', responseData);
    }
  } catch (error) {
    console.error('Erro durante a requisição ao Supabase:', error);
  }
};

export default trackEvent;
