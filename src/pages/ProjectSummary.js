import React, { useState } from 'react';
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
  albedo,
}) {
  const [isBack, setBack] = useState(false);

  const handleBack = (event) => {
    setBack(true);
  }

  const baseline = 1900;
  const addedEfficiency = albedo * 0.6 * 0.8;
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
          Project Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body">
              Your solar project located in postal code {zipCode} is being developed on a surface that is {groundType}. The expected overall albedo is
            </Typography>
            <Typography variant="body">
              &nbsp;
            </Typography>
            <Typography variant="body" color="primary">
              <b>{albedo}</b>.
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
              For the number bifacial solar panels, this will cost 
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
              For the number monofacial solar panels, this will cost 
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
        
      </React.Fragment>
    );
  }
}