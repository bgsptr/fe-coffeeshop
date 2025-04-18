import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";

export default function DatePickerWithRange() {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    console.log(startDate);
    console.log(endDate);
  }, [startDate, endDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <DateTimePicker
            label="Start date/time"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{
              textField: {
                size: "small", // Makes the text field smaller
                sx: { width: 300 }, // Set custom width
              },
            }}
          />

          <DateTimePicker
            label="End date/time"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            // minDate={startDate}  // Basic validation
            slotProps={{
              textField: {
                size: "small", // Makes the text field smaller
                sx: { width: 300 }, // Set custom width
              },
            }}
          />
        </Box>
      </DemoContainer>
    </LocalizationProvider>
  );
}
