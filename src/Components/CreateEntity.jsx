import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Breadcrumbs, Link, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';
import AboutProject from '../Containers/CreateProjects/AboutProject';
import UserDatePicker from '../Containers/CreateProjects/UserDatePicker';
import WorkersListControl from '../Containers/CreateProjects/WorkersListControl';

// const steps = ['О проекте', 'Настройки', 'Участники'];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// const StepPages = [
//     <AboutProject/>,
//     <UserDatePicker/>,
//     <WorkersListControl/>
// ]

export default function CreateEntity({
    stepsNames,
    stepsPages,
    name

}) {
  const [open, setOpen] = React.useState(true);

 
  const handleClose = () => {
    setOpen(false);
  };

 

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("Вы не можете пропустить этап.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
             {name}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose} disabled>
              Сохранить
            </Button>
          </Toolbar>
        </AppBar>
       <Box sx={{p:5}}>

       <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {stepsNames.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === stepsNames.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
           Все этапы выполнены
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Сброс</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>

          <Box>
              

              {
                stepsPages[activeStep]
              }

          </Box>

          

         
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Назад
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Пропустить
              </Button>
            )} */}

            <Button onClick={handleNext}>
              {activeStep === stepsNames.length - 1 ? 'Закончить' : 'Далее'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>


        </Box>
      </Dialog>
    </React.Fragment>
  );
}