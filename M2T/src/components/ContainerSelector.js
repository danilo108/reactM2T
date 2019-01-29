import React from 'react'
import {Card, CardContent, Paper} from "@material-ui/core"
import {Typography, Chip,List, ListItem, ListItemSecondaryAction, Grid,Divider, Checkbox} from "@material-ui/core"
import PropTypes from 'prop-types'
import NameValuePair from "./NameValuePair"



const uiSizes = ["xs", "sm", "md", "lg", "xl"]

class ContainerSelector extends React.Component{
    constructor(props){
        super(props)
       
       
        this.state ={
                        selectedContainers: props.selectedContainers
                    }
        this.handleSelectContainer.bind(this);
        
    }

    handleSelectContainer(event, container){
        if(container != null){
            const selectedContainers = this.state.selectedContainers
            if(this.state.selectedContainers.indexOf(container.containerNumber) === -1){
                selectedContainers.push(container.containerNumber)
            }else{
                 selectedContainers.pop(container.containerNumber)  
            }
            this.setState({selectedContainers: selectedContainers})
        }
    }

    handleDelete = (event, containerNumber) =>{
       const selectedContainers = this.state.selectedContainers
       selectedContainers.pop(  containerNumber) 
       this.setState({selectedContainers: selectedContainers})
       
    }
    render = () => {
         const styles = theme => ({
                                        root: {
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexWrap: 'wrap',
                                            padding: theme.spacing.unit / 2,
                                        },
                                        chip: {
                                            margin: theme.spacing.unit / 2,
                                        },
                                    });
        return (
           
            <Card>
                <CardContent>
                    
                 
                    {this.state.selectedContainers.map((containerNunber, index) =>{
                        return (
                            <Chip key={containerNunber} label={containerNunber} className={styles.chip} onDelete={(event) =>this.handleDelete(event, containerNunber)} />
                        )
                    })}
  
                    <List dense >
                    {this.props.containers.map(( container, index) => {
                       
                        return (
                        <Paper key={container.containerNumber}>
                        <ListItem key={container.containerNumber} frames="boxes">
                        <Divider />
                            <Grid container direction="row">
                                <Grid item xs={4} container ><NameValuePair  hideLabelOn={"md"} xsLabel={"C"}  label={"Container"} value={container.containerNumber} /></Grid>
                                <Grid item xs={4}  container><NameValuePair hideLabelOn={"md"} lgLabel={"Shipped"}  label={"Shipped on"}><Typography  >{container.shippedOn.toLocaleDateString()} </Typography>  </NameValuePair></Grid>
                                <Grid item xs={4} ><NameValuePair  hideLabelOn={"xs"} lgLabel={"Boxes"} xsLabel={"B"} label={"Total boxes"}><Typography  >{container.totalBoxes} </Typography>  </NameValuePair></Grid>
                                <Grid item xs={4} ><NameValuePair  hideLabelOn={"xs"} xsLabel={"H"}  label={"Hardware"}><Typography  >{container.hardware} </Typography>  </NameValuePair></Grid>
                                <Grid item xs={4}><NameValuePair  hideLabelOn={"xs"} xsLabel={"J"} lgLabel={"Jobs"}  label={"Total Jobs"}><Typography  >{container.jobs.length} </Typography>  </NameValuePair></Grid>                            </Grid>
                            <ListItemSecondaryAction>
                                <Checkbox 
                                    checked={this.state.selectedContainers.indexOf(container.containerNumber) > -1} 
                                    onClick={this.onCheckBoxClick = (event) =>{this.handleSelectContainer(event, container); this.props.updateSelecContainersF(this.state.selectedContainers)} }
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        </Paper>
                    )})}
                    </List>
                
                </CardContent>
            </Card>
        )
    }
}
ContainerSelector.propTypes = {
    selectedContainers: PropTypes.arrayOf(PropTypes.string)
}


export default ContainerSelector

