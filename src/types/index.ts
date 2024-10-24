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
  projects?: ProjectType[];
};

export type ApartmentDetails = {
  name: string;
  description: string;
  reraID: string;
  projectType: string;
  projectLaunchedDate: string;
  projectPossessionDate: string;
  totalArea: string;
  pricePerSquareFeetRate: string;
  projectLocation: string;
  latitude: string;
  longitude: string;
  projectSize: string;
  landmark: string;
  noOfFloors: string;
  noOfFlats: string;
  noOfFlatsPerFloor: string;
  noOfTowers: string;
  constructionType: string;
  ClubHouseSize: string;
  totalOpenSpace: string;
  videoLink: string;
  projectHighlightsPoints: string;

  amenities: string[],
  clubHouseAmenities: string[],
  OutdoorAmenities: string[],
  
  nearByHighlights: string[],
  bhkType: string[];
  
  siteMap: File[];
  masterPlan: File[];
  elevationImages: File[];
  amenitiesImages: File[];
  floorPlanPdf: File[];
  reraCertificate: File[];
  brochurePdf: File[];
  priceSheet: File[];
  projectHighlights: File[];

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