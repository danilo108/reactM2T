import React from "react"
import PropTypes from "prop-types"
import PrintLabel from "./PrintLabel"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import withWidth from '@material-ui/core/withWidth'

const uiSizes = ["xs", "sm", "md", "lg", "xl"]


class NameValuePair extends React.Component {

    render = () =>{
        const theme = this.props.theme ? this.props.theme : {}
        const value = this.props.value
        const children = this.props.children
       const {
        width
    } = this.props;
   
        const labelPortion = (this.props.labelPortion && Number.isInteger(this.props.labelPortion) && this.props.labelPortion <= 12 && this.props.labelPortion > 0? this.props.labelPortion: 8)
        const valuePortion = (labelPortion === 12?1:12-labelPortion)
        const hideLabelOn = this.props.hideLabelOn
        
        const hideOnSize = this.props.hideOnSize
        const label = this.props.label
        const xsLabel = this.props.xsLabel
        const smLabel = this.props.smLabel
        const mdLabel = this.props.mdLabel
        const lgLabel = this.props.lgLabel
        const xlLabel = this.props.xlLabel
        const noGrid = this.props.noGrid
        if(hideOnSize){
            const widthIndex = uiSizes.indexOf(width);
            
            const hideOnSizeIndex = uiSizes.indexOf(hideOnSize)
           
            if(widthIndex >= 0 && widthIndex <= hideOnSizeIndex){
         
                //The current size is equal or less than the hideOnSize then the whole component should be hidden
                return null
            }
        }
        return noGrid?(
                <React.Fragment>
                                    <PrintLabel
                                        hideLabelOn={hideLabelOn} 
                                        label={label}	
                                        xsLabel={xsLabel}	
                                        smLabel={smLabel}	
                                        mdLabel={mdLabel}	
                                        lgLabel={lgLabel}	
                                        xlLabel={xlLabel}  
                                    />
                             
                                    {this.props.children?this.props.children:<Typography>{this.props.value}</Typography>}                               
                               
               </React.Fragment>

        ):
        (

                           <Grid container direction="row" justify="space-between" alignItems="flex-end">
                                <Grid item xs={labelPortion} >
                                    <PrintLabel
                                        hideLabelOn={hideLabelOn} 
                                        label={label}	
                                        xsLabel={xsLabel}	
                                        smLabel={smLabel}	
                                        mdLabel={mdLabel}	
                                        lgLabel={lgLabel}	
                                        xlLabel={xlLabel}  
                                    />
                                </Grid>
                                <Grid item xs={valuePortion} style={{textAlign: "right"}} >
                                    {this.props.children?this.props.children:<Typography>{this.props.value}</Typography>}                               
                                </Grid>
                            </Grid>
                            
               

        )

    }
}
NameValuePair.propTypes = {

    hideLabelOn: PropTypes.oneOf(uiSizes),
    label: PropTypes.string.isRequired,
    xsLabel: PropTypes.string,
    smLabel: PropTypes.string,
    mdLabel: PropTypes.string,
    lgLabel: PropTypes.string,
    xlLabel: PropTypes.string,
    value: PropTypes.string,
    labelPortion: PropTypes.number,
    hideOnSize: PropTypes.oneOf(uiSizes),
    noGrid: PropTypes.bool

}
export default withWidth()(NameValuePair);