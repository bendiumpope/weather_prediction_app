import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DROPDOWNOPTIONS } from '../utils/helpers';

function DropDown({ setCity, value }) {

    const handleChange = (event) => {
        setCity(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Select a City"
                    onChange={handleChange}
                >
                    {Object.keys(DROPDOWNOPTIONS).map(city => (<MenuItem key={city} value={city}>{DROPDOWNOPTIONS[city]}</MenuItem>))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default DropDown;