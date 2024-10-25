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

  amenities: string[];
  clubHouseAmenities: string[];
  OutdoorAmenities: string[];

  nearByHighlights: string[];
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
  Latitude: string;
  Longitude: string;
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
    title: string;
    images: string[];
  }[];
};

export type FetchAdminVillaDetails = {
  "projectId": string,
  "adminId": string,
  "villaID": string,
  "assignedBuilderID": string,
  "villaName": string,
  "villaLocation": string,
  "villaSize": string,
  "noOfVillas": string,
  "villaFacing": string,
  "basePricePerSqft": string,
  "launchDate": string,
  "possessionDate": string,
  "villaConfigurations": string,
  "villasType": string,
  "villaSizeStarting": string,
  "villaSizeEnding": string,
  "plotSizeStarting": string,
  "plotSizeEnding": string,
  "priceRangeStarting": string,
  "priceRangeEnding": string,
  "clubhouseSize": string,
  "additionalProvision": string,
  "reraID": string,

  "videoLink": string,
  "projectHighlightsPoints": string[],

  "RERAApproval": boolean,
  "villaStatus": "APPROVED" | "REJECTED" | "PENDING",
  
  "builder": {
    "name": string
    "CompanyPhone": string,
    "CompanyName": string
  },

  "villaMedia": {
    title: string,
    images: string[]
  }[]
}

export type FetchAdminPlotDetails = {
  "projectId": string,
  "adminId": string,
  "assignedBuilderID": string,

  "plotName": string,
  "plotLocation": string,
  "plotLayoutSize": string,
  "plotType": string,
  "approvals": string,
  "totalPlots": string,
  "plotSizes": string,
  "plotFacing": string,
  "reraID": string,
  "pricePerSqYard": string,
  "priceStartsFrom": string,
  "amenities": string,
  "projectHighlightsPoints": string[],
  "RERAApproval": boolean,

  "villaStatus": "APPROVED" | "REJECTED" | "PENDING",

  "builder": {
    "name": string
    "CompanyPhone": string,
    "CompanyName": string
  },

  "plotMedia": {
    title: string,
    images: string[]
  }[]
}

/*

Plot

[
      {
          "title": "Master Plan",
          "images": [
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/amdin-villa/Sunrise_Gardens_Plot/masterPlan/8dd6d915-741a-4658-a5a9-1b996e3a8385_Screenshot_20240906-190725.jpg",
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/amdin-villa/Sunrise_Gardens_Plot/masterPlan/167392d7-c3ce-4629-ad5d-92cf3bae88d7_Screenshot_20240906-190739.jpg"
          ]
      },
      {
          "title": "Site Map",
          "images": [
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/amdin-villa/Sunrise_Gardens_Plot/siteMap/6208cca2-a68e-49ff-afe1-702972dcfeb6_Screenshot_20240906-190639.jpg"
          ]
      },
      {
          "title": "Plot Images",
          "images": [
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/amdin-villa/Sunrise_Gardens_Plot/plotImages/4fdb739a-6bd3-4fab-8dad-58859237adec_Screenshot_20240906-190725.jpg"
          ]
      },
      {
          "title": "Amenities",
          "images": [
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/amdin-villa/Sunrise_Gardens_Plot/amenitiesImages/3d432f5b-fedd-4ced-8bc6-790984a5d577_Screenshot_20240906-190739.jpg"
          ]
      }
  ]

*/

/*

Villa

[
      {
          "title": "Master Plan",
          "images": [
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/admin-villa/Sunset_Villas/masterPlan/f9974975-8beb-4982-86db-555d62a24d7b_Screenshot_20240906-190725.jpg"
          ]
      },
      {
          "title": "Site Map",
          "images": [
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/admin-villa/Sunset_Villas/siteMap/782f76c3-ae90-435d-872f-607fcd377f51_WhatsApp_Image_2024-10-16_at_17.58.27_1.jpeg"
          ]
      },
      {
          "title": "Elevation Images",
          "images": [
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/admin-villa/Sunset_Villas/elevationImages/d03310ce-5d77-4b7c-90ec-8e26d4f2bb8e_Screenshot_20240906-190755.jpg"
          ]
      },
      {
          "title": "Floor Plan",
          "images": []
      },
      {
          "title": "Amenities",
          "images": [
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/admin-villa/Sunset_Villas/amenitiesImages/daa17d6a-6e45-49ea-b6bb-e4b4a0c0df93_Screenshot_20240906-190739.jpg"
          ]
      },
      {
          "title": "Rera Certificate",
          "images": []
      },
      {
          "title": "Brochure",
          "images": []
      },
      {
          "title": "Price Sheet",
          "images": []
      }
  ]

*/

/*

Apartment

[
      {
          "title": "Master Plan",
          "images": [
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/1c937070-1385-4f5f-bd73-b627fba07866/The_Pinnacle/siteMap/06dbb2fa-d29f-44a2-92a2-6bb51acf9c80_Screenshot_20240906-190639.jpg",
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/1c937070-1385-4f5f-bd73-b627fba07866/The_Pinnacle/siteMap/31923aa8-72e0-476b-b4ee-bab1585b47ea_Screenshot_20240906-190725.jpg",
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/1c937070-1385-4f5f-bd73-b627fba07866/The_Pinnacle/siteMap/4986f8a2-765e-4d88-b770-db1ae37b2015_Screenshot_20240906-190739.jpg"
          ]
      },
      {
          "title": "Site Map",
          "images": [
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/1c937070-1385-4f5f-bd73-b627fba07866/The_Pinnacle/siteMap/06dbb2fa-d29f-44a2-92a2-6bb51acf9c80_Screenshot_20240906-190639.jpg",
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/1c937070-1385-4f5f-bd73-b627fba07866/The_Pinnacle/siteMap/31923aa8-72e0-476b-b4ee-bab1585b47ea_Screenshot_20240906-190725.jpg",
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/1c937070-1385-4f5f-bd73-b627fba07866/The_Pinnacle/siteMap/4986f8a2-765e-4d88-b770-db1ae37b2015_Screenshot_20240906-190739.jpg"
          ]
      },
      {
          "title": "Elevation Images",
          "images": [
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/1c937070-1385-4f5f-bd73-b627fba07866/The_Pinnacle/siteMap/06dbb2fa-d29f-44a2-92a2-6bb51acf9c80_Screenshot_20240906-190639.jpg",
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/1c937070-1385-4f5f-bd73-b627fba07866/The_Pinnacle/siteMap/31923aa8-72e0-476b-b4ee-bab1585b47ea_Screenshot_20240906-190725.jpg",
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/1c937070-1385-4f5f-bd73-b627fba07866/The_Pinnacle/siteMap/4986f8a2-765e-4d88-b770-db1ae37b2015_Screenshot_20240906-190739.jpg"
          ]
      },
      {
          "title": "Floor Plan",
          "images": [
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/1c937070-1385-4f5f-bd73-b627fba07866/The_Pinnacle/siteMap/06dbb2fa-d29f-44a2-92a2-6bb51acf9c80_Screenshot_20240906-190639.jpg",
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/1c937070-1385-4f5f-bd73-b627fba07866/The_Pinnacle/siteMap/31923aa8-72e0-476b-b4ee-bab1585b47ea_Screenshot_20240906-190725.jpg",
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/1c937070-1385-4f5f-bd73-b627fba07866/The_Pinnacle/siteMap/4986f8a2-765e-4d88-b770-db1ae37b2015_Screenshot_20240906-190739.jpg"
          ]
      },
      {
          "title": "Amenities",
          "images": [
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/1c937070-1385-4f5f-bd73-b627fba07866/The_Pinnacle/siteMap/06dbb2fa-d29f-44a2-92a2-6bb51acf9c80_Screenshot_20240906-190639.jpg",
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/1c937070-1385-4f5f-bd73-b627fba07866/The_Pinnacle/siteMap/31923aa8-72e0-476b-b4ee-bab1585b47ea_Screenshot_20240906-190725.jpg",
              "https://reportal-media.s3.ap-south-1.amazonaws.com/projects/1c937070-1385-4f5f-bd73-b627fba07866/The_Pinnacle/siteMap/4986f8a2-765e-4d88-b770-db1ae37b2015_Screenshot_20240906-190739.jpg"
          ]
      },
      {
          "title": "Rera Certificate",
          "images": []
      },
      {
          "title": "Brochure",
          "images": []
      },
      {
          "title": "Price Sheet",
          "images": []
      }
  ]

*/
