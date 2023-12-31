"use client";

import Select from "react-select";
import citiesGeoJSON from "../../../data/cities.json";
import { memo } from "react";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  code: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const cities = citiesGeoJSON.features.map((feature) => ({
  flag: feature.properties.flag,
  label: feature.properties.name,
  latlng: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
  code: feature.properties.code,
  value: feature.properties.name,
}));

const CitiesSelect: React.FC<CountrySelectProps> = memo(
  ({ value, onChange }) => {
    CitiesSelect.displayName = "CitiesSelect";
    return (
      <div>
        <Select
          placeholder="La Réunion"
          isClearable
          options={cities}
          value={value}
          onChange={(value) => onChange(value as CountrySelectValue)}
          formatOptionLabel={(option: any) => (
            <div className="select__content">
              <span className="select__content__flag">{option.flag}</span>
              <div className="select__content__label">
                {option.label}
                <span>, {option.code}</span>
              </div>
            </div>
          )}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: "#049dea",
              primary25: "#e4efff",
            },
          })}
        />
      </div>
    );
  }
);

export default CitiesSelect;
