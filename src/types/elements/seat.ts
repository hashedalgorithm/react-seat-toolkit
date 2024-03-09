import type { ISection } from "./polyline";

export interface ISeatCategory {
  id: string;
  name: string;
  color: string;
  textColor: string;
  section?: string;
}

export enum SeatStatus {
  Available = "Available",
  Unavailable = "Unavailable",
  Reserved = "Reserved"
}

export interface ISeat {
  id: string;
  x: number;
  y: number;
  label?: string;
  category?: string | null;
  status?: SeatStatus | string;
}

export interface IPopulatedSeatCategory extends Omit<ISeatCategory, "section"> {
  section?: ISection;
}

export interface IPopulatedSeat extends Omit<ISeat, "category"> {
  category?: IPopulatedSeatCategory;
}
