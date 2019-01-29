import React from 'react'
import { Stepper, Step, StepLabel } from "@material-ui/core"
import { Typography, Hidden } from "@material-ui/core"
import PropTypes from 'prop-types'
import ContainerSelector from './ContainerSelector'
import DocketsViewer   from "./DocketsViewer"
import Button from "@material-ui/core/Button"
import MessageDisplay from "./MessageDisplay"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true },
});


class PrintReportWizard extends React.Component{
 
    constructor(props){
        super(props)
        this.state = {
                        stateData: {
                            selectedContainers: []      
                        },
                        activeStepIndex: this.props.activeStepIndex?this.props.activeStepIndex:0,
                        messages:{
                            errors:[],
                            infos: [],
                            warnings: [],
                            successes: []
                        }

                    }
        this.updateSelecContainers.bind(this)
        this.submitFilter.bind(this)
        this.handleNext.bind(this   )
    }

    submitFilter = (filterState) => {
        alert(JSON.stringify(filterState))
    }
    updateSelecContainers = (selectedContainers) =>{
        this.setState(
                        {
                            stateData: {
                                selectedContainers:selectedContainers
                                    }
                        }
                    );
        console.log(this.state);
    }

    handleNext = (e) =>{
        const activeStepIndex = this.state.activeStepIndex
        if(this.validate(activeStepIndex)){
            this.setState({activeStepIndex: activeStepIndex+1})
        }
    }

    validate = (activeStepIndex)=>{
        if(activeStepIndex === 0){
            if(this.state.stateData.selectedContainers.length !== 1){
                this.setState({
                    messages:{
                        errors:["You can select only one Container"]
                    }
                })
                return false;
            }
            
        }else if(activeStepIndex === 1){
            //Validate container selector
        }else if(activeStepIndex === 2){
            //Validate container selector
        }
        return true
    }
    render = () =>{
         const dockets = ( [{
                    docketId: "aaaaaaa",
                    code: "CCNSW",
                    fullName: "Versol",
                    phone: "02 344 043200",
                    address: "3, powderworks street narrabeen",
                    gate: "*12245#",
                    lock: "12456",
                    toll: true,
                    keys: true,
                    boxes: {
                                panels: 55,
                                frames: 20,
                                hardware: 4,
                                blinds: 1,
                                total: 70,
                                formattedSize: "XL",
                                sizes:{
                                   s:0,
                                   m:0,
                                   l:10,
                                   xl:30,
                                   xxl:0,
                                },
                            },
                    jobs:   [
                                    {
                                        jobId: "aaaaa1",
                                        code: "VER",
                                        clientName: "Mark Rent",
                                        jobRef: "AU1243-99",
                                        boxes: {
                                            panels: 35,
                                            frames: 12,
                                            hardware: 3,
                                            blinds: 1,
                                            total: 51,
                                            formattedSize: "XL",
                                            size: 230.3

                                        }
                                    },
                                    {
                                        jobId: "2aaaaa2",
                                        code: "VER",
                                        clientName: "Nicki willosn",
                                        jobRef: "AU1393321-A32",
                                        boxes: {
                                            panels: 20,
                                            frames: 8,
                                            hardware: 1,
                                            blinds: 0,
                                            total: 29,
                                            formattedSize: "L",
                                            size: 121.2

                                        }
                                    },
                                    
                                ]
                    },
                    {
                    docketId: "1qwert1235456",
                    code: "ABY",
                    fullName: "Dekay Pty Ltd, Kim Cropper",
                    phone: "02 9679 0400",
                    address: "1/30 Park Road Mulgrave NSW 2156",
                    gate: "*12245#",
                    lock: "12456",
                    toll: true,
                    keys: true,
                    boxes: {
                                panels: 40,
                                frames: 23,
                                hardware: 4,
                                blinds: 1,
                                total: 68,
                                formattedSize: "XL",
                                sizes:{
                                   s:0,
                                   m:0,
                                   l:10,
                                   xl:30,
                                   xxl:0,
                                },
                            },
                    jobs:   [
                                    {
                                        jobId: "qqqejjjj2",
                                        code: "ABY",
                                        clientName: "SO087188-NSW-PETERS, Maria #2-PO028653",
                                        jobRef: "AU1393834-99",
                                        boxes: {
                                            panels: 30,
                                            frames: 15,
                                            hardware: 3,
                                            blinds: 1,
                                            total: 49,
                                            formattedSize: "XL",
                                            size: 140.3

                                        }
                                    },
                                    {
                                        jobId: "nnnnn12nnn",
                                        code: "ABY",
                                        clientName: "GEORGE",
                                        jobRef: "AU1393834-99",
                                        boxes: {
                                            panels: 10,
                                            frames: 8,
                                            hardware: 1,
                                            blinds: 0,
                                            total: 19,
                                            formattedSize: "L",
                                            size: 121.2

                                        }
                                    },
                                    
                                ]
                    }
                ])
        const activeStep = this.state.activeStepIndex
        return (
            <MuiThemeProvider theme={theme}>
                
                    <Stepper activeStep={activeStep}>
                        {
                            this.props.steps.map ((step, index) =>{
                                return (
                                
                                        <Step key={step.label} {...step}  disabled={index>activeStep?true:false} completed={index<activeStep?true:false} >
                                            <StepLabel optional={step.description?<Typography noWrap={false}  variant="caption">{step.subTitle}</Typography>:null} >{step.label}</StepLabel>
                                        </Step>
                                
                                )
                            })
                        }
                    </Stepper>
        

                {activeStep == 0?<ContainerSelector selectedContainers={this.state.stateData.selectedContainers}  updateSelecContainersF={this.updateSelecContainers} {...this.props} />:null}
                {activeStep == 1?<DocketsViewer onSubmit={this.submitFilter} dockets={dockets} />:null}

                <MessageDisplay errors={this.state.messages.errors} />
                <Button onClick={this.handleNext} variant="contained" color="primary" >Next</Button>
            </MuiThemeProvider>
        )
    }
}
   PrintReportWizard.propTypes  = {
        activeStepIndex: PropTypes.number,
        steps: PropTypes.arrayOf(

            PropTypes.shape(
            {
                label: PropTypes.string.isRequired,
                completed: PropTypes.bool.isRequired,
                description: PropTypes.string.optional
            }))
    }
export default PrintReportWizard