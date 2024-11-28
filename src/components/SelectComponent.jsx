import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack } from '@mui/material';

export default function SelectComponent() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Stack direction={"row"} justifyContent={"center"}>
      <Box style={{ marginTop: "50px", width: "250px" }}>
        <FormControl
          fullWidth
          sx={{
            "& .MuiInputLabel-root": { color: "white" }, // Label text color
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" }, // Border color
              "&:hover fieldset": { borderColor: "white" }, // Hover border color
              "&.Mui-focused fieldset": { borderColor: "white" }, // Focused border color
              "& input": { color: "white" }, // Input text color
            },
            "& .MuiSelect-root": { color: "white" }, // Selected value text color
            "& .MuiSelect-icon": { color: "white" }, // Arrow color
          }}
        >
          <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "black", // Background of the dropdown menu
                  "& .MuiMenuItem-root": {
                    color: "white", // Menu item text color
                    "&:hover": {
                      backgroundColor: "gray", // Hover background for menu items
                    },
                  },
                },
              },
            }}
            sx={{
              color: "white", // Selected value text color
            }}
          >
            <MenuItem value={10}>مكة</MenuItem>
            <MenuItem value={20}>مصر</MenuItem>
            <MenuItem value={30}>فلسطين</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
}
