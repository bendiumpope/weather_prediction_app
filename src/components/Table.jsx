import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    name,
    calories,
    fat,
    carbs,
    protein,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const DenseTable = ({row}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Weather Summary</TableCell>
                        <TableCell align="right">Max Temperature (2m)</TableCell>
                        <TableCell align="right">Min Temperature (2m)&nbsp;(g)</TableCell>
                        <TableCell align="right">Total Precipitation&nbsp;(g)</TableCell>
                        <TableCell align="right">Sunrise Time&nbsp;(g)</TableCell>
                        <TableCell align="right">Sunset Time&nbsp;(g)</TableCell>
                        <TableCell align="right">Max Wind Speed (10m)&nbsp;(g)</TableCell>
                        <TableCell align="right">Dominant Wind Direction (10m)&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {rows.map((row) => ( */}
                        <TableRow
                            key={row.weathercode}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.weathercode}
                            </TableCell>
                            <TableCell align="right">{row.temperature_2m_max}</TableCell>
                            <TableCell align="right">{row.temperature_2m_min}</TableCell>
                            <TableCell align="right">{row.precipitation_sum}</TableCell>
                            <TableCell align="right">{row.sunrise}</TableCell>
                            <TableCell align="right">{row.sunset}</TableCell>
                            <TableCell align="right">{row.windspeed_10m_max}</TableCell>
                            <TableCell align="right">{row.winddirection_10m_dominant}</TableCell>
                        </TableRow>
                    {/* ))} */}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DenseTable;

