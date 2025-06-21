import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDateToShortMonth(dateString: string): string {
  const date = new Date(dateString);

  date.setUTCHours(12, 0, 0, 0);

  const formatted = format(date, 'MMM d, yyyy', { locale: ptBR });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}