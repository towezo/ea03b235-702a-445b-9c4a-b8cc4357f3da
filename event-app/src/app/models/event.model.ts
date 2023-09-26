import { Artist } from './artist.model'; 
import { Venue } from './venue.model';
import { Pick} from './pick.model';

export interface Event {
  artists?: Artist[];
  attending?: number;
  city?: string;
  contentUrl?: string;
  country?: string;
  date?: string;
  endTime?: string;
  flyerFront?: string;
  pick?: Pick;
  id?: string;
  private?: boolean;
  startTime?: string;
  title?: string;
  venue?: Venue;
  __v?: number;
  _id?: string;
}
