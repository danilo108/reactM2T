import React from "react"
import withWidth from '@material-ui/core/withWidth'
import Typography from '@material-ui/core/Typography'
import PropTypes from "prop-types"

const uiSizes = ["xs", "sm", "md", "lg", "xl"]

function PrintLabel(props) {
    const {
        width
    } = props;
    const currentSize = width;
    

    const hideLabelOn = props.hideLabelOn
    const widthIndex = uiSizes.indexOf(width);
    const hideOnSizeIndex = uiSizes.indexOf(hideLabelOn)
    if(widthIndex >= 0 && widthIndex <= hideOnSizeIndex){
        //if hideLabelOn size is equal or less the current size then do not show the label
        return null
    }
    const label = props.label
    const labelArray = [props.xsLabel, props.smLabel, props.mdLabel, props.lgLabel, props.xlLabel]
    
    let labelIndex = -1
    for(let i = widthIndex; i < labelArray.length; i++){
           if(labelArray[i] !== undefined){
               labelIndex = i
               break
           }
    }

    return <Typography>{labelIndex >= 0? labelArray[labelIndex]:label}</Typography>

}


PrintLabel.propTypes = {

    hideLabelOn: PropTypes.oneOf(uiSizes),
    label: PropTypes.string.isRequired,
    xsLabel: PropTypes.string,
    smLabel: PropTypes.string,
    mdLabel: PropTypes.string,
    lgLabel: PropTypes.string,
    xlLabel: PropTypes.string,
    value: PropTypes.string,
    separator: PropTypes.string
    

}

export default withWidth()(PrintLabel);