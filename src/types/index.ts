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
  keyHighlights: string[],
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

  bhkType: string[];
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
  basePricePerSqft: string;
  launchDate: string;
  possessionDate: string
  villasConfiguration: string;
  villasType: string;
  villaSizeStarting: string;
  villaSizeEnding: string;
  plotSizeStarting: string;
  plotSizeEnding: string;
  priceRangeStarting: string;
  priceRangeEnding: string;
  clubHouseSize: string;
  additionalProvision: string;
  reraID: string;

  siteMap: File[];
  masterPlan: File[];

  amenitiesImages: File[];
  projectHighlightsPoints: string;
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
  reraID: string;
  pricePerSqYard: string;
  priceStartsFrom: string;
  amenities: string;

  siteMap: File[];
  masterPlan: File[];

  amenitiesImages: File[];
  plotImages: File[];
  projectHighlightsPoints: string;
};

export type BuildersDataType = {
  approvedBuildersLength: number;
  pendingBuildersLength: number;
  rejectedBuildersLength: number;
  approvedBuilders: BuilderType[];
  pendingBuilders: BuilderType[];
  rejectedBuilders: BuilderType[];
}