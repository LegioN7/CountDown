import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { ReactNode, useState } from "react";
import "./App.css";

function HeaderDisplay() {
  return (
    <header className="header">
      <h1>Disney Countdown</h1>
    </header>
  );
}

function CountdownDisplay({ countdown }: { countdown: number | null }) {
  return (
    <div className="countdown">
      {countdown !== null ? (
        <p>{countdown} days until Disney</p>
      ) : (
        <p>Select your dates</p>
      )}
    </div>
  );
}

function App({ children }: { children: ReactNode }) {
  const [startDate, setValue] = useState<Dayjs | null>(dayjs(dayjs().toDate()));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs("2024-06-19"));

  const calculateCountdown = (start: Dayjs | null, end: Dayjs | null) => {
    return end ? end.diff(start, "days") : null;
  };

  const countdown = calculateCountdown(startDate, endDate);

  const StartDatePicker = () => {
    return (
      <DatePicker
        value={startDate}
        onChange={(newValue) => setValue(newValue)}
      />
    );
  };

  const EndDatePicker = () => {
    return (
      <DatePicker
        value={endDate}
        onChange={(newValue) => setEndDate(newValue)}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <HeaderDisplay />
      <CountdownDisplay countdown={countdown} />
      {children}
      <div className="datepicker">
        <div className="datepicker-container">
          <div className="datepicker-label">
            <p>Start Date</p>
          </div>
          <StartDatePicker />
        </div>
        <div className="datepicker-container">
          <div className="datepicker-label">
            <p>End Date</p>
          </div>
          <EndDatePicker />
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default App;
