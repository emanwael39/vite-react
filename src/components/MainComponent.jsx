import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import {
  Divider,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
} from "@mui/material";
import Prayer from "./prayer";
import photo1 from "../images/photo2.jpeg";
import photo2 from "../images/b5.png";
import photo3 from "../images/photo3.jpeg";
import photo4 from "../images/b4.png";
import photo5 from "../images/b3.png";
import moment from "moment";
import "moment/locale/ar";
moment.locale("ar");

export default function MainComponent() {
  const [city, setCity] = useState({
    displayedName: "القاهرة",
    APIName: "Cairo",
  });

  const [currentTime, setCurrentTime] = useState("");
  const [timings, setTimings] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });

  const [nextPrayer, setNextPrayer] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  const prayersArray = [
    { prayerName: "الفجر", APIName: "Fajr" },
    { prayerName: "الظهر", APIName: "Dhuhr" },
    { prayerName: "العصر", APIName: "Asr" },
    { prayerName: "المغرب", APIName: "Maghrib" },
    { prayerName: "العشاء", APIName: "Isha" },
  ];

  const updateTime = () => {
    const formattedTime = moment().format("dddd، D MMMM YYYY - h:mm:ss A");
    setCurrentTime(formattedTime);
  };

  const calculateTimeLeft = () => {
    if (!timings.Fajr) return; // تأكد من أن التوقيتات محملة.

    const momentNow = moment();
    let prayerIndex = 0;

    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    }

    const nextPrayerTime = moment(timings[prayersArray[prayerIndex].APIName], "hh:mm");
    const duration = moment.duration(nextPrayerTime.diff(momentNow));
    setTimeLeft(`${duration.hours()} ساعة ${duration.minutes()} دقيقة ${duration.seconds()} ثانية`);
    setNextPrayer(prayerIndex);
  };

  const getTimings = async () => {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?city=${city.APIName}&country=Egypt&method=5`
      );
      setTimings(response.data.data.timings);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  useEffect(() => {
    getTimings();
  }, [city]);

  useEffect(() => {
    if (timings.Fajr) {
      updateTime();
      calculateTimeLeft();
    }
    const intervalId = setInterval(() => {
      updateTime();
      calculateTimeLeft();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timings]);

  const data = [
    { id: 1, name: "الفجر", src: photo1, time: timings.Fajr },
    { id: 2, name: "الظهر", src: photo2, time: timings.Dhuhr },
    { id: 3, name: "العصر", src: photo3, time: timings.Asr },
    { id: 4, name: "المغرب", src: photo4, time: timings.Maghrib },
    { id: 5, name: "العشاء", src: photo5, time: timings.Isha },
  ];

  const egyptCities = [
    { displayedName: "القاهرة", APIName: "Cairo" },
    { displayedName: "الجيزة", APIName: "Giza" },
    { displayedName: "حلوان", APIName: "Helwan" },
    { displayedName: "6 أكتوبر", APIName: "6th of October" },
    { displayedName: "العبور", APIName: "Obour City" },
    { displayedName: "القاهرة الجديدة", APIName: "New Cairo" },
    { displayedName: "شبرا الخيمة", APIName: "Shubra El Kheima" },
    { displayedName: "الإسكندرية", APIName: "Alexandria" },
    { displayedName: "بورسعيد", APIName: "Port Said" },
    { displayedName: "دمياط", APIName: "Damietta" },
    { displayedName: "مرسى مطروح", APIName: "Matrouh" },
    { displayedName: "العلمين", APIName: "El Alamein" },
    { displayedName: "رأس البر", APIName: "Ras El Bar" },
    { displayedName: "السويس", APIName: "Suez" },
    { displayedName: "الإسماعيلية", APIName: "Ismailia" },
    { displayedName: "العريش", APIName: "Arish" },
    { displayedName: "رفح", APIName: "Rafah" },
    { displayedName: "شرم الشيخ", APIName: "Sharm El Sheikh" },
    { displayedName: "دهب", APIName: "Dahab" },
    { displayedName: "طابا", APIName: "Taba" },
    { displayedName: "نويبع", APIName: "Nuweiba" },
    { displayedName: "أسيوط", APIName: "Asyut" },
    { displayedName: "سوهاج", APIName: "Sohag" },
    { displayedName: "قنا", APIName: "Qena" },
    { displayedName: "الأقصر", APIName: "Luxor" },
    { displayedName: "أسوان", APIName: "Aswan" },
    { displayedName: "المنيا", APIName: "Minya" },
    { displayedName: "بني سويف", APIName: "Beni Suef" },
    { displayedName: "نجع حمادي", APIName: "Nag Hammadi" },
    { displayedName: "الغردقة", APIName: "Hurghada" },
    { displayedName: "سفاجا", APIName: "Safaga" },
    { displayedName: "مرسى علم", APIName: "Marsa Alam" },
    { displayedName: "القصير", APIName: "Quseer" },
    { displayedName: "طنطا", APIName: "Tanta" },
    { displayedName: "المنصورة", APIName: "Mansoura" },
    { displayedName: "الزقازيق", APIName: "Zagazig" },
    { displayedName: "دمنهور", APIName: "Damanhur" },
    { displayedName: "كفر الشيخ", APIName: "Kafr El Sheikh" },
    { displayedName: "المحلة الكبرى", APIName: "Mahalla El Kubra" },
    { displayedName: "شبين الكوم", APIName: "Shebin El Kom" },
    { displayedName: "واحة سيوة", APIName: "Siwa Oasis" },
    { displayedName: "واحة البحرية", APIName: "Bahariya Oasis" },
    { displayedName: "واحة الفرافرة", APIName: "Farafra Oasis" },
    { displayedName: "واحة الداخلة", APIName: "Dakhla Oasis" },
    { displayedName: "واحة الخارجة", APIName: "Kharga Oasis" },
  ];


  const prayersList = data.map((item) => (
    <Prayer
      key={item.id}
      src={item.src}
      name={item.name}
      time={item.time ? moment(item.time, "HH:mm").format("hh:mm A") : ""}
    />
  ));

  return (
    <div>
    <Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
    <p>{currentTime}</p>
    <h2>{city.displayedName}</h2>
  </Grid>
  <Grid item xs={12} sm={6}>
    <p>الصلاة القادمة: {prayersArray[nextPrayer].prayerName}</p>
    <h2>{timeLeft}</h2>
  </Grid>
</Grid>

      <Divider style={{ borderColor: "white", opacity: ".1" }} />
      <Grid container spacing={2} justifyContent="center">
    {prayersList}
  </Grid>
      <Stack direction={"row"} justifyContent={"center"}>
        <Box style={{ marginTop: "50px", width: "250px" }}>
          <FormControl
            fullWidth
            sx={{
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
                "& input": { color: "white" },
              },
              "& .MuiSelect-root": { color: "white" },
              "& .MuiSelect-icon": { color: "white" },
            }}
          >
            <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={city.APIName}
              onChange={(event) => {
                const selectedObj = egyptCities.find(
                  (item) => item.APIName === event.target.value
                );
                setCity(selectedObj);
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "black",
                    "& .MuiMenuItem-root": {
                      color: "white",
                      "&:hover": {
                        backgroundColor: "gray",
                      },
                    },
                  },
                },
              }}
              sx={{
                color: "white",
                "& .MuiSelect-select": { color: "white" },
              }}
            >
              {egyptCities.map((city) => (
                <MenuItem key={city.APIName} value={city.APIName}>
                  {city.displayedName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </div>
  );
}
