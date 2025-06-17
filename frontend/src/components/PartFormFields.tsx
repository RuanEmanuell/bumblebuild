// src/components/PartFormFields.tsx
import React from "react";
import FormCPU from "./parts/CpuForm";
import FormGPU from "./parts/GpuForm";
import FormRAM from "./parts/RAMForm";
import FormCase from "./parts/CaseForm";
import FormMotherboard from "./parts/MotherboardForm";
import FormPowerSupply from "./parts/PowerSupplyForm";
import FormSSD from "./parts/SSDForm";
import FormCooler from "./parts/CoolerForm"

interface PartFormFieldsProps {
  selectedPartType: string;
  partBeingEdited: any;
  onChange: (e: React.ChangeEvent<any>) => void;
}

const PartFormFields: React.FC<PartFormFieldsProps> & {
  buildPayload: (type: string, data: any) => object;
} = ({
  selectedPartType,
  partBeingEdited,
  onChange,
}) => {
  switch (selectedPartType) {
    case "CPU":
      return <FormCPU formData={partBeingEdited} onChange={onChange} />;
    case "GPU":
      return <FormGPU formData={partBeingEdited} onChange={onChange} />;
    case "RAM":
      return <FormRAM formData={partBeingEdited} onChange={onChange} />;
    case "PSU":
      return <FormPowerSupply formData={partBeingEdited} onChange={onChange} />;
    case "CASE":
      return <FormCase formData={partBeingEdited} onChange={onChange} />;
    case "MOTHERBOARD":
      return <FormMotherboard formData={partBeingEdited} onChange={onChange} />;
    case "SSD":
      return <FormSSD formData={partBeingEdited} onChange={onChange} />;
    case "COOLER":
      return <FormCooler formData={partBeingEdited} onChange={onChange} />;
    default:
      return null;
  }
};

// helper para montar payload nested create
PartFormFields.buildPayload = (type, data) => {
  switch (type) {
    case "CPU":
      return {
        socket: data.socket,
        cores: Number(data.cores),
        threads: Number(data.threads),
        frequency: Number(data.frequency),
        tdp: Number(data.tdp),
        integratedGraphics: !!data.integratedGraphics,
      };
    case "GPU":
      return {
        memoryGB: Number(data.memoryGB),
        memoryType: data.memoryType,
        tdp: Number(data.tdp),
        lengthMM: Number(data.lengthMM),
      };
    case "RAM":
      return {
        capacityGB: Number(data.capacityGB),
        type: data.type,
        frequency: Number(data.frequency),
      };
    case "PSU":
        console.log(data.certification)
      return {
        powerW: Number(data.powerW),
        certification: data.certification,
        modular: !!data.modular,
      };
    case "MOTHERBOARD":
      return {
        socket: data.socket,
        maxRAM: Number(data.maxRAM),
        ramType: data.ramType,
        size: data.size,
        slots: Number(data.slots),
      };
    case "SSD":
        console.log(data.capacityGB)
      return {
        capacityGB: Number(data.capacityGB),
        type : data.typeSSD,
        readMBs : Number(data.readMBs) ,
        writeMBs : Number(data.writeMBs),
      };
    case "CASE" :
      return {
        supportedSizes : data.supportedSizes,
        maxGpuLengthMM : Number(data.maxGpuLengthMM) ,
      };
    case "COOLER" :
      return{
        type : data.coolerType,
        socketSupport : data.socketSupport,
      };
    default:
      return {};
  }
};

export default PartFormFields;