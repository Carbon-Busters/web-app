import React, { useState } from 'react';
import {Map, Marker} from 'pigeon-maps';
import {
  Button,
  Grid,
  Typography,
} from '@mui/material';
import SiteInfoForm from './SiteInfoForm';

export default function ProjectSummary({
  zipCode,
  groundType,
  annualKWh,
  pricePerBifacial,
  pricePerMonofacial,
  data,
}) {
  const [isBack, setBack] = useState(false);

  const handleBack = (event) => {
    setBack(true);
  }
  console.log(data);
  const position = [Number(data.lat), Number(data.long)];
  const baseline = 1900;
  const addedEfficiency = data.albedo * 0.6 * 0.8;
  const numBifacial = Math.ceil(annualKWh / ((1 + addedEfficiency) * baseline));
  const numMonofacial = Math.ceil(annualKWh / baseline);
  const costBifacialPanels = numBifacial * pricePerBifacial;
  const costMonofacialPanels = numMonofacial * pricePerMonofacial;
  const costBifacialInstall = numBifacial * 500 * 1.05;
  const costMonofacialInstall = numMonofacial * 500 * 1.05;
  const netBifacialSavings = costMonofacialPanels + costMonofacialInstall - costBifacialPanels - costBifacialInstall;
  const percentBifacialSavings = Math.ceil(10000 * netBifacialSavings / (costMonofacialPanels + costMonofacialInstall)) / 100;

  if (isBack) {
    return <SiteInfoForm/>;
  } else {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          <b>Project Summary</b>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body">
                  Your solar project located in postal code {zipCode} is being developed on a surface that is {groundType}. {data.desc} The expected overall albedo is
                </Typography>
                <Typography variant="body">
                  &nbsp;
                </Typography>
                <Typography variant="body" color="primary">
                  <b>{data.albedo}</b>.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body">
                  Increased efficiency per bifacial panel: 
                </Typography>
                <Typography variant="body">
                  &nbsp;
                </Typography>
                <Typography variant="body" color="primary">
                  <b>{addedEfficiency * 100}%</b>.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body">
                  To reach your desired energy output, you will need either
                </Typography>
                <Typography variant="body">
                  &nbsp;
                </Typography>
                <Typography variant="body" color="primary">
                  <b>{numBifacial}</b>
                </Typography>
                <Typography variant="body">
                  &nbsp;
                </Typography>
                <Typography variant="body">
                  bifacial solar panels or
                </Typography>
                <Typography variant="body">
                  &nbsp;
                </Typography>
                <Typography variant="body" color="primary">
                  <b>{numMonofacial}</b>
                </Typography>
                <Typography variant="body">
                  &nbsp;
                </Typography>
                <Typography variant="body">
                  monofacial solar panels.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body">
                  For the number of bifacial solar panels, this will cost 
                </Typography>
                <Typography variant="body">
                  &nbsp;
                </Typography>
                <Typography variant="body" color="primary">
                  <b>${costBifacialPanels}</b>.
                </Typography>
                <Typography variant="body">
                  &nbsp;
                </Typography>
                <Typography variant="body">
                  For the number of monofacial solar panels, this will cost 
                </Typography>
                <Typography variant="body">
                  &nbsp;
                </Typography>
                <Typography variant="body" color="primary">
                  <b>${costMonofacialPanels}</b>.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body">
                  To install the bifacial solar panels, this will cost 
                </Typography>
                <Typography variant="body">
                  &nbsp;
                </Typography>
                <Typography variant="body" color="primary">
                  <b>${costBifacialInstall}</b>.
                </Typography>
                <Typography variant="body">
                  &nbsp;
                </Typography>
                <Typography variant="body">
                  To install the monofacial solar panels, this will cost 
                </Typography>
                <Typography variant="body">
                  &nbsp;
                </Typography>
                <Typography variant="body" color="primary">
                  <b>${costMonofacialInstall}</b>.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body">
                  By only using bifacial solar panels, your net savings would be
                </Typography>
                <Typography variant="body">
                  &nbsp;
                </Typography>
                <Typography variant="body" color="primary">
                  <b>${netBifacialSavings}</b>
                </Typography>
                <Typography variant="body">
                  , or 
                </Typography>
                <Typography variant="body">
                  &nbsp;
                </Typography>
                <Typography variant="body" color="primary">
                  <b>{percentBifacialSavings}%</b>.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={handleBack} variant="contained" color="primary">
                  Back
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Map center={position} zoom={12}>
              <Marker anchor={position} payload={1} color="blue" onClick={({ event, anchor, payload }) => {}} />
            </Map>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}