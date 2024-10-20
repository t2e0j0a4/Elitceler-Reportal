export type UserType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
};

export type ProjectType = {};

export type BuilderType = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  CompanyName: string;
  AboutBuilder: string;
  CompanyRERAnumber: string;
  projects?: ProjectType[];
};

export type ApartmentDetails = {
  projectName: string;
  description: string;
  projectType: string;
  launchDate: string;
  possessionDate: string;
  basePrice: string;
  totalArea: string;
  projectSize: string;
  floors: string;
  flats: string;
  flatsPerFloor: string;
  towers: string;
  projectLocation: string;
  latitude: string;
  longitude: string;

  amenitiesBasic: string[],
  clubHouseAmenities: string[],
  outdoorAmenities: string[],
  constructionType: string;
  clubHouseSize: string;
  totalOpenSpace: string;

  siteMap: File[];
  masterPlan: File[];
  projectHighlights: File[];

  elevationImages: File[];
  amenities: File[];

  floorPlan: File[];
  videoLink: string;
  brochure: File[];

  priceSheet: File[];

  reraId: string;
  certificates: File[];
  projectHighlightPoints: string;
};

export type VillaDetails = {
  villaName: string;
  villaLocation: string;
  villaSize: string;
  villaFacing: string;
  basePrice: string;
  launchDate: string;
  possessionDate: string
  bhkType: string;
  villaType: string;
  villaSizeStart: string;
  villaSizeEnd: string;
  plotSizeStart: string;
  plotSizeEnd: string;
  priceRangeStart: string;
  priceRangeEnd: string;
  clubHouseSize: string;
  additionalProvision: string;
  reraId: string;

  siteMap: File[];
  masterPlan: File[];

  amenities: File[];
  projectHighlightPoints: string;
};

export type PlotDetails = {
  plotName: string;
  plotLocation: string;
  plotLayoutSize: string;
  plotType: string;
  approvals: string;
  totalPlots: string;
  plotSizes: string;
  plotFacing: string;
  reraId: string;
  pricePerSqYard: string;
  priceStartFrom: string;
  amenities: string;

  siteMap: File[];
  masterPlan: File[];

  amenitiesImages: File[];
  plotImages: File[];
  projectHighlightPoints: string;
};
