import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Head from "./components/Head";
import CardPrayer from "./components/CardPrayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar-dz";
const MainContent = () => {
  const [Today, setToday] = useState<string>();
  const [Timing, setTiming] = useState<any>({});
  const [Prayer, setPrayer] = useState<number>(2);
  const [TimeOutPrayer, setTimeOutPrayer] = useState<string | undefined>();
  type Selecting = { displayName: string; apiCity: string } | undefined;
  const [selectCity, setSelectCity] = useState<any | Selecting>({
    displayName: "مصر - القاهرة",
    apiCity: "Cairo",
  });

  const AvilableCity = [
    {
      displayName: "مصر - القاهرة",
      apiCity: "Cairo",
      apiKey: "EGY",
    },
    {
      displayName: "الامارات - ابو ظبي",
      apiCity: "Abu Dhabi",
      apiKey: "UAE",
    },
    {
      displayName: "السعودية - الرياض",
      apiCity: "Riyadh",
      apiKey: "KSA ",
    },
  ];
  const prayerTimes = [
    {
      key: "Fajr",
      prayerName: "الفجر",
    },
    {
      key: "Dhuhr",
      prayerName: "الظهر",
    },
    {
      key: "Asr",
      prayerName: "العصر",
    },
    {
      key: "Maghrib",
      prayerName: "المغرب",
    },
    {
      key: "Isha",
      prayerName: "العشاء",
    },
  ];

  const MainFetching = async () => {
    const fetching = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity/16-09-2023?city=${selectCity.apiCity}&country=${selectCity.apiKey}&method=8`
    );
    const data = fetching.data.data.timings;
    setTiming(data);

    // console.log(data.timings['Fajr'])
  };

  moment.locale("ar");
  const todayFun = () => {
    setToday(moment().format("MMMM Do YYYY | h:mm:ss a"));
  };

  useEffect(() => {
    MainFetching();
  }, [selectCity]);

  useEffect(() => {
    // setTimingOut();
    // console.log(moment().isBefore(moment(Timing['Fajr'],'hh:mm')))
    // console.log(moment(Timing.Dhuhr))
    const interval = setInterval(() => {
      todayFun();
      setTimingOut();
      timeOutSala();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [Timing, TimeOutPrayer]);

  const timeOutSala = () => {
    const prayerKey = prayerTimes[Prayer].key;
    const a = moment(Timing[prayerKey], "hh:mm");
    const now = moment();
    let remainingTime = a.diff(now);
    if (remainingTime < 0) {
      const remainMidNight = moment("23:59:59", "hh:mm:ss").diff(moment());
      const ramainMidNightAfter = moment(a).diff(
        moment("00:00:00", "hh:mm:ss")
      );
      const totalTime = remainMidNight + ramainMidNightAfter;
      remainingTime = totalTime;
    }
    const durationTime = moment.duration(remainingTime);
    setTimeOutPrayer(
      `${durationTime.seconds()} : ${durationTime.minutes()} : ${durationTime.hours()}`
    );
  };

  const setTimingOut = () => {
    let PrayerTime: number = 0;
    const TimeNow = moment();
    if (
      TimeNow.isAfter(moment(Timing["Fajr"], "hh:mm")) &&
      TimeNow.isBefore(moment(Timing["Dhuhr"], "hh:mm"))
    ) {
      // console.log("dohr");
      PrayerTime = 1;
    } else if (
      TimeNow.isAfter(moment(Timing["Dhuhr"], "hh:mm")) &&
      TimeNow.isBefore(moment(Timing["Asr"], "hh:mm"))
    ) {
      // console.log("asr");
      PrayerTime = 2;
    } else if (
      TimeNow.isAfter(moment(Timing["Asr"], "hh:mm")) &&
      TimeNow.isBefore(moment(Timing["Maghrib"], "hh:mm"))
    ) {
      // console.log("Maghrib");
      PrayerTime = 3;
    } else if (
      TimeNow.isAfter(moment(Timing["Maghrib"], "hh:mm")) &&
      TimeNow.isBefore(moment(Timing["Isha"], "hh:mm"))
    ) {
      // console.log("Isha");
      PrayerTime = 4;
    } else if (
      TimeNow.isBefore(moment(Timing["Fajr"], "hh:mm")) ||
      TimeNow.isAfter(moment(Timing["Isha"], "hh:mm"))
    ) {
      // console.log("Fajr");
      PrayerTime = 0;
    }
    setPrayer(PrayerTime);
  };

  const handleChange = (e: SelectChangeEvent) => {
    const CityObject = AvilableCity.find((city) => {
      return city.apiCity === e.target.value;
    });
    setSelectCity(CityObject);
    // console.log(e.target.value);
  };

  return (
    <div>
      <Head
        title={selectCity.displayName}
        time={Today}
        salaTime={prayerTimes[Prayer].prayerName}
        TimeOutPrayer={TimeOutPrayer}
      />
      <div className="card-holder">
        <CardPrayer
          title="الفجر"
          time={Timing.Fajr}
          img="/src/assets/asr-prayer-mosque.png"
        />
        <CardPrayer
          title="الظهر"
          time={Timing.Dhuhr}
          img="/src/assets/dhhr-prayer-mosque.png"
        />
        <CardPrayer
          title="العصر"
          time={Timing.Asr}
          img="/src/assets/fajr-prayer.png"
        />
        <CardPrayer
          title="المغرب"
          time={Timing.Maghrib}
          img="/src/assets/night-prayer-mosque.png"
        />
        <CardPrayer
          title="العشاء"
          time={Timing.Isha}
          img="/src/assets/sunset-prayer-mosque.png"
        />
      </div>
      <Stack
        direction="row"
        justifyContent={"center"}
        margin={5}
        flexWrap={"wrap"}
      >
        <FormControl className="w-50 text-light">
          <InputLabel id="demo-simple-select-label" className="text-light lable-select">
            المدينة
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectCity}
            label="Age"
            onChange={handleChange}
            className="text-light select"
          >
            {AvilableCity.map((city) => {
              return (
                <MenuItem value={city.apiCity} key={Math.random()}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </div>
  );
};

export default MainContent;
