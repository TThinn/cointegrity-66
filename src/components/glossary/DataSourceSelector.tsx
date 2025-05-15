
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { DataSourceType } from "./types";

interface DataSourceSelectorProps {
  dataSource: DataSourceType;
  onChangeDataSource: (source: DataSourceType) => void;
  disabled?: boolean;
}

export const DataSourceSelector: React.FC<DataSourceSelectorProps> = ({
  dataSource,
  onChangeDataSource,
  disabled = false
}) => {
  // Simplified data sources since we only have one source available
  const dataSources = [
    { value: "original" as DataSourceType, label: "Original Glossary Terms" }
  ];

  return (
    <div className="mb-6">
      <label className="text-sm font-medium mb-1 block">
        Data Source
      </label>
      <Select 
        value={dataSource} 
        onValueChange={(value) => onChangeDataSource(value as DataSourceType)}
        disabled={disabled}
      >
        <SelectTrigger className="w-full md:w-64">
          <SelectValue placeholder="Select data source" />
        </SelectTrigger>
        <SelectContent>
          {dataSources.map(source => (
            <SelectItem key={source.value} value={source.value}>
              {source.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
