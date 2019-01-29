import React from "react"
import Grid from "@material-ui/core/Grid"
import DocketsFilter from "./DocketsFilter"
import Typography from "@material-ui/core/Typography"
import JobActions from "./JobActions"

import Docket from "./Docket"


class DocketsViewer extends React.Component{

    constructor(props){
        super(props)
        this.originalDockets = props.dockets?props.dockets:[]
        this.jobsMap = new Map()
        this.originalDockets.forEach(docket => {
                docket.jobs.forEach(job=>{
                    this.jobsMap.set(job.jobId, job)
                })
            }
        )
     this.state = {
            dockets: this.originalDockets.sort((d1, d2)=>{return d2.boxes.total - d1.boxes.total}),
            selectedDockets:[],
            counter: 0,
            selectedJobIds: this.props.selectedJobs?this.props.selectedJobs.map(job => {return job.jobId}):[]
        }
    }

    validateActions = (state) =>{
        let validation = {
            isValid: true,
            validationMessages: [],
        }
        if(state){
            const targetDocket = state.targetDocket
            const createNewDocket = state.createNewDocket
            const confirmCreation = state.confirmCreation
            /*
                1) check if there is a need of a new Docket, if yes add teh warning that a new docket with the code [state.targetDocket] will be created
                2) if it there is a need of a new Docket, then check if the checkbox is ticked 
                3) Check if there is any job select
                4) check if the targetDocket is not empty
            */
           //3
            if(this.state.selectedJobIds.length ==0){
                validation.isValid = false
                validation.validationMessages.push( "Expand the jobs panel from one or more dockets and select the jobs that you want to move to another docket")
                // return validation
            }

            //1-4
            if(!targetDocket){
                validation.isValid = false;
                validation.validationMessages.push("Choose the docket where you want to move the jobs selected")
                // return validation
            }
            //2
            if(createNewDocket && !confirmCreation ){
                validation.isValid = false
                validation.validationMessages.push("[ " + targetDocket + " ] is a new docket code, confirm the creation of a new docket before to apply the changes")
                // return validation
            }
            return validation
        }

    }
    addJobSelection = (job) =>{
        const selectedJobIds = this.state.selectedJobIds
        const index = selectedJobIds.indexOf(job.jobId)
        if(index === -1){
            selectedJobIds.push(job.jobId)
            this.setState({selectedJobIds:selectedJobIds})
        }
        console.log(this.state)
    }

    removeJobSelection = (job) =>{
        const selectedJobIds = this.state.selectedJobIds
        const index = selectedJobIds.indexOf(job.jobId)
        if(index !== -1){
            selectedJobIds.splice(index, 1)
            this.setState({selectedJobIds:selectedJobIds})
        }
    }
    performFilter = (state) => {
            let counter = this.state.counter
            counter ++
            this.setState({counter: counter})
            console.log("called parent function filter")
        }

    componentDidMount = () =>{
        console.log(this)
    }
    render = () => {
       

           const selectedJobs = this.state.selectedJobIds.map(id=>{return this.jobsMap.get(id)})
           
            return (
         
                    <Grid container spacing={16}>
                        <Grid xs={12} item><Typography var="h3" >{this.state.counter}</Typography> </Grid>
                        <Grid xs={12} item  ><DocketsFilter performFilter={this.performFilter }/></Grid>
                        <Grid item xs={12} sm={6} container spacing={8} direction="row" >
                    
                        {
                            this.originalDockets.map(d => {
                                return ( <Grid item xs={12}><Docket variant={"jobCentric"} docket={d} addJobSelection={this.addJobSelection} removeJobSelection={this.removeJobSelection} selectedJobs={this.state.selectedJobIds}/></Grid>)
                            })
                        }
                        
                        </Grid>
                        <Grid item xs={12} sm={6} ><JobActions selectedJobs={selectedJobs} removeJobSelection={this.removeJobSelection} dockets={this.state.dockets} validationFunction={this.validateActions} /></Grid>
                    </Grid>
            )
    }
}

DocketsViewer.defaultProps = {
    jobSelection: true,
    actionable: true,
    actionName: "Select",
    originalDockets: []
}

export default DocketsViewer