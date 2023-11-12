import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Container,
  Grid,
  FormHelperText,
  Typography,
  CircularProgress,
} from '@mui/material';
import ProjectSummary from './ProjectSummary';

const GroundTypes = [
  "Native grasses",
  "Sandy with exposed rocks, sparse grass, desert shrubs and small cactus",
  "Fine rock and scattered creosote bush",
  "Pasture grass and sparse deciduous trees",
  "3/4 grass and 1/4 crops",
  "Concrete",
  "White-painted concrete",
  "Gravel, light to medium gray",
  "White tarp",
  "Mixed grass prairie",
  "Hay pasture",
  "Switchgrass",
  "Alfalfa",
  "Pasture grass",
  "Grassland",
  "Semi-arid grassland with 38-80% bare ground from livestock grazing",
  "Tall fescue grass mowed annually",
  "Post forest fire grasslands",
  "Turfgrass lawn",
  "Low sagebrush",
  "Mountain big sagebrush",
  "Desert",
  "Desert Grassland",
  "Tall grass prairie",
  "Semidesert grassland",
  "Grass",
];

export default function SiteInfoForm() {
  const [zipCode, setZipCode] = useState('');
  const [groundType, setGroundType] = useState('');
  const [annualKWh, setAnnualKWh] = useState('');
  const [pricePerMonofacial, setPricePerMonofacial] = useState('');
  const [pricePerBifacial, setPricePerBifacial] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!zipCode || !groundType || !annualKWh || !pricePerMonofacial || !pricePerBifacial) {
      setFormError('All fields are required.');
      return;
    }

    // Check for numbers
    if (isNaN(zipCode) || isNaN(annualKWh) || isNaN(pricePerBifacial) || isNaN(pricePerMonofacial)) {
      setFormError('Please enter valid numerical values.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://tabbe.co:8001/api?zipcode=' + zipCode + '&input=' + groundType);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setFormError('An error occurred fetching your data.');
      setLoading(false);
      return;
    }
    
    // Reset form error
    setFormError('');
    
    

    // Perform actions with the form data (e.g., submit to a server)
    console.log({
      zipCode,
      groundType,
      annualKWh,
      pricePerMonofacial,
      pricePerBifacial,
    });

    setIsSubmitted(true);
  };

  if (loading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress/>
      </div>
    );
  }

  if (isSubmitted) {
    return <ProjectSummary zipCode={zipCode} groundType={groundType} annualKWh={Number(annualKWh)} pricePerBifacial={Number(pricePerBifacial)} pricePerMonofacial={Number(pricePerMonofacial)} data={data}/>;
  } else {
    return (
      <Container>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            <b>Site Information</b>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Zip Code"
                variant="outlined"
                fullWidth
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel id="ground-type-label">Ground Type</InputLabel>
                <Select
                  labelId="ground-type-label"
                  label="Ground Type"
                  value={groundType}
                  onChange={(e) => setGroundType(e.target.value)}
                >
                  {GroundTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Expected Annual kWh"
                variant="outlined"
                fullWidth
                value={annualKWh}
                onChange={(e) => setAnnualKWh(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price per Bifacial Solar Panel"
                variant="outlined"
                fullWidth
                value={pricePerBifacial}
                onChange={(e) => setPricePerBifacial(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price per Monofacial Solar Panel"
                variant="outlined"
                fullWidth
                value={pricePerMonofacial}
                onChange={(e) => setPricePerMonofacial(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
          {formError && <FormHelperText error>{formError}</FormHelperText>}
        </form>
      </Container>
    );
  }
  
}