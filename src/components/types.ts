import { ReactNode } from "react";

export interface RawatJalan {
  id_rawat_jalan: string;
  id_patient: string;
  id_doctor: string;
  visit_date: string;
  status_rawat_jalan: string;
  verifikasi_status: string;
  doctor_name: string;
  patient_name: string;
  queue_no: number;
  queue_status: string;
  id_queue: number;
}

export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  // status: string;
}

export interface FileUploadAttribute {
  name: string;
  size: number;
}

export interface Props {
  children?: ReactNode;
}

export const MessageSenderProfile: {
  USER: "USER";
  BOT: "BOT";
} = {
  USER: "USER",
  BOT: "BOT",
};

export type MessageSenderProfile =
  (typeof MessageSenderProfile)[keyof typeof MessageSenderProfile];

export const Role: {
  ADMIN: "ADMIN";
  DOCTOR: "DOCTOR";
  PATIENT: "PATIENT";
} = {
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  PATIENT: "PATIENT",
};

export type Role = (typeof Role)[keyof typeof Role];

export const ItemCategory: {
  COFFEE: "COFFEE";
  TEA: "TEA";
  SNACK: "SNACK";
  DESSERT: "DESSERT";
} = {
  COFFEE: "COFFEE",
  TEA: "TEA",
  SNACK: "SNACK",
  DESSERT: "DESSERT",
};

export type ItemCategory = (typeof ItemCategory)[keyof typeof ItemCategory];

export const CustomInputType: {
  DATE: "date";
  PASSWORD: "password";
  TEXT: "text";
} = {
  DATE: "date",
  PASSWORD: "password",
  TEXT: "text"
};

export type CustomInputType = (typeof CustomInputType)[keyof typeof CustomInputType];


export const PaymentTypeEnum: {
  CASH: "CASH";
  CARD: "CARD";
  ONLINE: "ONLINE";
} = {
  CASH: "CASH",
  CARD: "CARD",
  ONLINE: "ONLINE"
};

export type PaymentTypeEnum = (typeof PaymentTypeEnum)[keyof typeof PaymentTypeEnum];

export const PaymentStatusEnum: {
  PAID: "PAID";
  PENDING: "PENDING";
  FAILED: "FAILED";
} = {
  PAID: "PAID",
  PENDING: "PENDING",
  FAILED: "FAILED"
};

export type PaymentStatusEnum = (typeof PaymentStatusEnum)[keyof typeof PaymentStatusEnum];
