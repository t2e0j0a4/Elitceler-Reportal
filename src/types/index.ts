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
  projectId?: string;
  adminId?: string;
  assignedBuilderID?: string;
  apartmentID?: string;

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
  landmark: string;
  projectSize: string;
  noOfFloors: string;
  noOfFlats: string;
  noOfFlatsPerFloor: string;
  noOfTowers: string;
  ClubHouseSize: string;
  totalOpenSpace: string;
  constructionType: string;

  videoLink: string;
  projectHighlightsPoints: string;

  amenities: string[];
  clubHouseAmenities: string[];
  OutdoorAmenities: string[];
  nearByHighlights: string[];

  bhkType: string;
  sizeInSqft: string;
  facing: string;
  basePrice: string;
  unitPlanConfigFiles: File[];

  siteMap: File[];
  masterPlan: File[];
  elevationImages: File[];
  floorPlanPdf: File[];
  brochurePdf: File[];
  priceSheet: File[];
  amenitiesImages: File[];
  reraCertificate: File[];
  projectHighlights: File[];

  createdAt?: string;
  projectStatus?: string;
};

export type VillaDetails = {
  projectId?: string;
  adminId?: string;
  villaID?: string;
  assignedBuilderID?: string | null;

  villaName: string;
  villaLocation: string;
  villaSize: string;
  villaFacing: string;
  basePricePerSqft: string;
  launchDate: string;
  possessionDate: string;
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
  projectId?: string;
  adminId?: string;
  assignedBuilderID?: string | null;

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
};

// ***************************************************************

export type FetchAdminApartmentDetails = {
  projectId: string;
  adminId: string;
  assignedBuilderID: string;
  apartmentID: string;

  name: string;
  description: string;
  projectLocation: string;
  projectSize: string;
  noOfFloors: string;
  noOfFlats: string;
  noOfTowers: string;
  noOfFlatsPerFloor: string;
  Clubhousesize: string;
  totalOpenSpace: string;
  constructionType: string;
  latitude: string;
  longitude: string;
  reraID: string;
  projectType: string;
  projectLaunchedDate: string;
  projectPossession: string;
  pricePerSquareFeetRate: string;
  totalArea: string;
  flatSizes: string;
  budget: string;
  LandMark: string;
  NearByHighlights: string;
  amenities: string;
  clubHouseAmenities: string;
  OutdoorAmenities: string;
  videoLink: string;

  projectHighlightsPoints: string[];

  RERAApproval: boolean;
  projectStatus: "APPROVED" | "REJECTED" | "PENDING";
  bestDeals: boolean;
  selectedProperties: boolean;
  editorChoice: boolean;
  newProject: boolean;
  lifestyleProject: boolean;
  readyToMove: boolean;
  adsProject: boolean;

  adminUnitPlanConfigs: {
    unitPlanConfigID: string;
    projectId: string;
    BHKType: string;
    sizeInSqft: string;
    Facing: string;

    basePrice: string;
    unitPlanConfigFiles: string[];
  }[];

  projectMedia: {
    [x: string]: string[]
  };

};

export type FetchAdminVillaDetails = {
  projectId: string;
  adminId: string;
  villaID: string;
  assignedBuilderID: string;
  villaName: string;
  villaLocation: string;
  villaSize: string;
  noOfVillas: string;
  villaFacing: string;
  basePricePerSqft: string;
  launchDate: string;
  possessionDate: string;
  villaConfigurations: string;
  villasType: string;
  villaSizeStarting: string;
  villaSizeEnding: string;
  plotSizeStarting: string;
  plotSizeEnding: string;
  priceRangeStarting: string;
  priceRangeEnding: string;
  clubhouseSize: string;
  additionalProvision: string;
  reraID: string;

  videoLink: string;
  projectHighlightsPoints: string[];

  RERAApproval: boolean;
  villaStatus: "APPROVED" | "REJECTED" | "PENDING";

  builder: {
    name: string;
    CompanyPhone: string;
    CompanyName: string;
  };

  villaMedia: {
    title: string;
    images: string[];
  }[];
};

export type FetchAdminPlotDetails = {
  projectId: string;
  adminId: string;
  assignedBuilderID: string;

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
  projectHighlightsPoints: string[];
  RERAApproval: boolean;

  villaStatus: "APPROVED" | "REJECTED" | "PENDING";

  builder: {
    name: string;
    CompanyPhone: string;
    CompanyName: string;
  };

  plotMedia: {
    title: string;
    images: string[];
  }[];
};