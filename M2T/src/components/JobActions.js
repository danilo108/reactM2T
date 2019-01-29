import React from 'react'
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Chip from "@material-ui/core/Chip";
import IntegrationAustosuggest from "./experiment/IntegrationAutosuggest"
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button"
import { Typography } from '@material-ui/core';




class JobActions extends React.Component{
    constructor(props){
        super(props)
       this.state = {
                            targetDocket: "",
                            createNewDocket: false,
                            confirmCreation: false,
                    }
        this.validation = {
                isValid: false,
                validationMessages: []
        }
        console.log("constructor" , this.state, this.validation)
    }

    componentDidUpdate= () => {
         console.log("didUpdate" , this.state, this.validation)
    }
    componentDidMount = () => {
        console.log("didMount" , this.state, this.validation)
    }
    componentWillMount = () =>{
         console.log("willMount" , this.state, this.validation)
    }
    componentWillUpdate = () => {
         console.log("willupdate" , this.state, this.validation)
    }

    componentWillReceiveProps = () => {
         console.log("willReceiveProps" , this.state, this.validation)
    }

    validate = () =>{
        if(this.props.validationFunction){
            try {
                const validation = this.props.validationFunction(this.state)
                if(validation.isValid === true || validation.isValid === false){
                    this.validation = {isValid: validation.isValid}
                }
                if(validation.validationMessages){
                        this.validation.validationMessages = validation.validationMessages
                }

            } catch (error) {
                console.error("Error calling the validation function form JobActions component", error, this.props.validationFunction)
            }
            

        }
    }

    onDeselect = (job) =>{
        console.log(job)
    }

    onChangeTargetDocket = (value) => {
        if(value){
            const dockets = this.props.dockets?this.props.dockets:[]
            const createNewDocket = dockets.reduce((found, docket) =>{return found+( docket.code.toUpperCase().trim() === value.toUpperCase().trim()?1:0)},0) === 0
            this.setState(  {
                                targetDocket: value.trim(),
                                createNewDocket: createNewDocket,
                                confirmCreation: false,

                            
                            })
        }

    }

    onClickMoveJobs = (e) =>{
        if(this.validation.isValid){
            if(this.props.moveJobs){
                this.props.moveJobs(this.state.createNewDocket, this.state.targetDocket)
            }
        }
    }
    handleChangeOnConfirmCreation = (e) =>{
        this.setState({confirmCreation: e.target.checked})
    }

    // validate = () =>{
    //     if(this.state.createNewDocket && !this.state.confirmCreation){
    //         return true
    //     }
    //     return false
    // }
    render = () => {
         console.log("render" , this.state, this.validation)
         this.validate()
        const selectedJobs = this.props.selectedJobs
        return (
            <Card>
                <CardContent>
                    <Grid container  spacing={16} direction="row" justify="flex-start" alignItems="flex-start">
                        {selectedJobs.map(job => {
                            return ( <Grid item > <Chip color="primary" label={job.code + " " + job.clientName + " " + job.boxes.total} onDelete={(e) => this.props.removeJobSelection(job)} />  </Grid>)
                        })}
                        <Grid item xs={12} >
                            <Grid container direction="row">
                                <Grid item xs={9} sm={6}>
                                     <IntegrationAustosuggest suggestions={this.props.dockets} onChange={this.onChangeTargetDocket} ons  />                               
                                </Grid>
                                <Grid item xs={3}>
                                    {this.state.createNewDocket?(
                                        <FormControl required error={!this.validation.isValid} component="fieldset" >
                                            <FormControlLabel
                                                control={
                                                        <Checkbox checked={this.state.confirmCreation} onChange={this.handleChangeOnConfirmCreation}  />
                                                    }
                                                label="Yes, create a new docket"
                                                />
                                        </FormControl>
                                        ):null}
                                </Grid>
                                <Grid item xs="12" sm="3">
                                        <FormControl required error={!this.validation.isValid} component="fieldset" >
                                            <FormControlLabel
                                                control={
                                                    <Button variant="contained" component="span" color="primary" onClick={this.onClickMoveJobs} disabled={!this.validation.isValid}  >Move jobs</Button>
 
                                                }
                                               
                                                />
                                        </FormControl>
                                </Grid>
 
                                {this.validation.validationMessages.length == 0?null:(
                                        <Grid container>
                                            {this.validation.validationMessages.map(message=><Grid item xs={12}><Typography variant="subtitle2" >{message}</Typography></Grid> )}
                                        </Grid>
                                )}


                            </Grid>

                            
                        </Grid>
                    </Grid>   
                </CardContent>
            </Card>
        )
        
    }
}

export default JobActions