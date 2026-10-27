import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Stack } from "@mui/material";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import { useState } from "react";
// import axios from "axios";
// data = response
import Prayer from "./Prayer";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar-dz";
moment.locale("ar");

export default function MainContent() {
  const [selectedCity, setSelectedCity] = useState({
    displayName: "مدينة حُمص",
    apiName: "Homs",
  });
  const availableCites = [
    { displayName: "مدينة دمشق", apiName: "Damascus" },
    { displayName: "مدينة حماة", apiName: "Hama" },
    { displayName: "مدينة طرطوس", apiName: "Tartus" },
    {
      displayName: "مدينة حُمص",
      apiName: "Homs",
    },
  ];
  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  const [today, setToday] = useState("");
 // const [timer, setTimer] = useState(10);
  const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
  const getTimings = async () => {
    console.log("safa");
    const data = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=SY&city=${selectedCity.apiName}`
    );
    setTimings(data.data.data.timings);
  };
  useEffect(() => {
    getTimings();
    const t = moment();
    setToday(t.format("MMM Do YYYY | h:mm"));
  }, [selectedCity]);

  useEffect(() => {
    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const [timings, setTimings] = useState({
    Fajr: "05:28",
    Dhuhr: "12:17",
    Asr: "15:18",
    Maghrib: "17:45",
    Isha: "19:05",
  });
  const handleCityChange = (event) => {
    const cityObject = availableCites.find((city) => {
      return city.apiName === event.target.value;
    });
    setSelectedCity(cityObject);
  };
  const setupCountdownTimer = () => {
    const momentNow = moment();
    let PrayerIndex = 2;
    if (
      momentNow.isAfter(
        moment(timings["Fajr"]) && momentNow.isBefore(moment(timings["Dhuhr"]))
      )
    ) {
      PrayerIndex = 1;
    } else if (
      momentNow.isAfter(
        moment(timings["Dhuhr"]) && momentNow.isBefore(moment(timings["Asr"]))
      )
    ) {
      PrayerIndex = 2;
    } else if (
      momentNow.isAfter(
        moment(timings["Asr"]) && momentNow.isBefore(moment(timings["Maghrib"]))
      )
    ) {
      PrayerIndex = 3;
    } else if (
      momentNow.isAfter(
        moment(timings["Maghrib"]) &&
          momentNow.isBefore(moment(timings["Isha"]))
      )
    ) {
      PrayerIndex = 4;
    } else {
      PrayerIndex = 0;
    }
    setNextPrayerIndex(PrayerIndex);

    const Isha = timings["Isha"];
    const IshaMoment = moment(Isha, "hh:mm");
    console.log(momentNow.isAfter(IshaMoment));
  };
  return (
    <>
      <Grid container>
        <Grid size={6}>
          <div>
            <h2>{today}</h2>
            <h1> {selectedCity.displayName}</h1>
          </div>
        </Grid>
        <Grid size={6}>
          <div>
            <h2>متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName} </h2>
            <h1>00:10:20 </h1>
          </div>
        </Grid>
      </Grid>

      <Divider style={{ borderColor: "white", opacity: "0.2" }} />

      {/* <h2>{timer}</h2> */}

      <Stack
        direction="row"
        justifyContent={"space-around"}
        style={{ marginTop: "50px" }}
      >
        <Prayer name="الفجر" time={timings.Fajr} img="\myImages\fajer.jpg" />
        <Prayer name="الظهر" time={timings.Dhuhr} img="\myImages\thoher.jpg" />
        <Prayer name="العصر" time={timings.Asr} img="\myImages\aser.jpg" />
        <Prayer
          name="المغرب"
          time={timings.Maghrib}
          img="\myImages\moghred.jpg"
        />
        <Prayer name="العشاء" time={timings.Isha} img="\myImages\eshaa.jpg" />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        style={{ marginTop: "40px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}>المدينة</span>
          </InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            onChange={handleCityChange}
          >
            {availableCites.map((city) => {
              return (
                <MenuItem value={city.apiName} key={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
