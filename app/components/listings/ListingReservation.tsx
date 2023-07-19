"use client";

import { Range } from "react-date-range";
import Button from "../inputs/forms/Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div>
      <div>
        <div>$ {price} / night</div>
      </div>
      <div className="calendar__container">
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value: any) => onChangeDate(value.selection)}
        />
      </div>
      <Button
        disabled={disabled}
        label="Reserve"
        onClick={onSubmit}
        primaryButton
      />
      <div>
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
