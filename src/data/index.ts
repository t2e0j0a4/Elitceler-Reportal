import { BuilderType, UserType } from "@/types";

export const users: UserType[] = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "+91 9876543210",
    username: "johndoe",
  },
  {
    id: "2",
    name: "Dany Doe",
    email: "danydoe@gmail.com",
    phone: "+91 9876543210",
    username: "danydoe",
  },
  {
    id: "3",
    name: "Kiran Doe",
    email: "kirandoe@gmail.com",
    phone: "+91 9876543210",
    username: "kirandoe",
  },
  {
    id: "4",
    name: "Kiran Remo",
    email: "kiranremo@gmail.com",
    phone: "+91 9876543210",
    username: "kiranremo",
  },
];

export const fetchedBuilders: {
    message: string,
    approvedBuildersLength: number,
    approvedBuilders: BuilderType[],
    pendingBuildersLength: number,
    pendingBuilders: BuilderType[],
    rejectedBuildersLength: number,
    rejectedBuilders: BuilderType[]

} = {
  message: "Builder data fetched successfully",
  approvedBuildersLength: 5,
  pendingBuildersLength: 12,
  rejectedBuildersLength: 1,
  approvedBuilders: [
    {
      id: "c8f2f007-0461-4c6f-b03c-948c17ffd6fd",
      name: "builder api",
      email: "uly1l1jwwowo@eevafyxh.com",
      phoneNumber: "1234567890",
      CompanyName: "",
      AboutBuilder: ""
    },
    {
      id: "ce5a711e-4c43-4cfe-bd56-fc6b76716eaa",
      name: "VK Infra",
      email: "vamshi2425@gmail.com",
      phoneNumber: "+919776176197",
      CompanyName: "Vamshi Krishna",
      AboutBuilder: ""
    },
    {
      id: "1c937070-1385-4f5f-bd73-b627fba07866",
      name: "builder api",
      email: "uly1l1jowo@vafyxh.com",
      phoneNumber: "+919347243575",
      CompanyName: "Anvita Projects",
      AboutBuilder: ""
    },
    {
      id: "d1671374-cc4f-4f1a-a557-eded88d0ca3b",
      name: "Sai Krishna",
      email: "saikrishna.alishala@gmail.com",
      phoneNumber: "+917075202565",
      CompanyName: "ElitCeler Technologies",
      AboutBuilder: "The best"
    },
    {
      id: "0534c7c3-8746-4880-b4fb-c1258782d540",
      name: "builder api",
      email: "adminBuilder@gmail.com",
      phoneNumber: "9087892651",
      CompanyName: "",
      AboutBuilder: ""
    },
  ],
  pendingBuilders: [
    {
      id: "b2d25255-16d9-4b0d-8e00-049acd7e451c",
      name: "builder api",
      email: "ulyee1l1jwwowo@eevafyxh.com",
      phoneNumber: "1234567890",
      CompanyName: "",
      AboutBuilder: ""
    },
    {
      id: "b446e4bf-26ef-4523-bc2f-f33177a1c713",
      name: "abcd",
      email: "if5k55gx4q@wywnxa.com",
      phoneNumber: "9876509876",
      CompanyName: "",
      AboutBuilder: ""
    },
    {
      id: "0f469e88-3893-43bc-8145-bac8231a4d04",
      name: "builder 2",
      email: "abcdefgh@hmmail.com",
      phoneNumber: "+919876543213",
      CompanyName: "",
      AboutBuilder: ""
    },
    {
      id: "5eecd972-3581-4015-9de1-7b0e8df886d1",
      name: "Vamshi Krishna ",
      email: "Vamshi2425@gmail.com",
      phoneNumber: "+919700399900",
      CompanyName: "Vamshi Krishna ",
      AboutBuilder: "Hyderabad based builder "
    },
    {
      id: "60e83caf-da1f-4ed9-b22f-3fdf0f5d254b",
      name: "jnfjkekj",
      email: "jejej@gmail.com",
      phoneNumber: "+919876521987",
      CompanyName: "builde",
      AboutBuilder: "jfnjrffr"
    },
    {
      id: "66f65c9e-aa7c-47f5-83e4-2cbef23ba450",
      name: "vy3uoid9sn",
      email: "vy3uoid9sn@rfcdrive.com",
      phoneNumber: "9876509870",
      CompanyName: "",
      AboutBuilder: ""
    },
    {
      id: "6e66d390-0a74-4044-8674-e03716f89ec1",
      name: "new builder",
      email: "hahah@gmail.com",
      phoneNumber: "+919828383838",
      CompanyName: "",
      AboutBuilder: "builderr"
    },
    {
      id: "92512cc6-ad7f-470e-847a-1d7aacb6e5b0",
      name: "builder api",
      email: "alexo@eevafyxh.com",
      phoneNumber: "1234567890",
      CompanyName: "",
      AboutBuilder: ""
    },
    {
      id: "99c129d0-07e1-455d-a3a5-17d2d81253c6",
      name: "builder api",
      email: "trent@eevafyxh.com",
      phoneNumber: "1234567890",
      CompanyName: "",
      AboutBuilder: ""
    },
    {
      id: "ad9bca17-919c-4181-83a1-6dbb8f4bd73a",
      name: "jnfjkekj",
      email: "abcdbuilder@gmail.com",
      phoneNumber: "+916302224876",
      CompanyName: "builderABCD",
      AboutBuilder: "hello builder"
    },
    {
      id: "d61d0be6-67fd-4ad4-ac8e-68cd60c11554",
      name: "builder api",
      email: "uly1l1jowo@eevafyxh.com",
      phoneNumber: "1234567890",
      CompanyName: "",
      AboutBuilder: ""
    },
    {
      id: "f9f636e6-f379-4759-b604-48181031d5c4",
      name: "builder3",
      email: "egrmkr@gmail.com",
      phoneNumber: "+91998776662",
      CompanyName: "",
      AboutBuilder: ""
    },
  ],
  rejectedBuilders: [
    {
      id: "fb8c3263-7883-4ef1-9332-9eb551a0444f",
      name: "abcdbuilder",
      email: "abcd@yahoo.com",
      phoneNumber: "9876509876",
      CompanyName: "",
      AboutBuilder: ""
    },
  ],
};
