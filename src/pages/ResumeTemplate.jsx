import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PDFExport } from '@progress/kendo-react-pdf';
import { Button, Tooltip } from 'reactstrap';

// import "./ResumeTemplate.scss";


class ResumeTemplate extends Component {
    constructor(){
        super();
    }
    exportPDF = () => {
        this.resume.save();
    }
    render(){
        return(
            <div>
                <div style={{ textAlign: 'center', marginBottom: 10 }}><button onClick={this.exportPDF} style={{ margin: 'auto' }}>download</button></div>
                <PDFExport paperSize={'Letter'}
                    fileName="_____.pdf"
                    title=""
                    subject=""
                    keywords=""
                    ref={(r) => this.resume = r}>
                        <div style={{
                            height: 700,
                            width: 600,
                            padding: 'none',
                            backgroundColor: 'white',
                            boxShadow: '5px 5px 5px black',
                            margin: 'auto',
                            overflowX: 'hidden',
                            overflowY: 'hidden',
                            hover:true}}> 
                            <h1 style={{backgroundColor:"teal", textAlign:"center"}}>Example Resume</h1>
                            </div>

                            
                </PDFExport>                       
            </div>
           
        )
    }
}

// class ResumeTemplate extends Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       tooltipOpen: false
//     };
//   }

//   toggle() {
//     this.setState({
//       tooltipOpen: !this.state.tooltipOpen
//     });
//   }

//   render() {
//     return (
//       <span>
//         <Button className="mr-1" color="secondary" id={'Tooltip-' + this.props.id}>
//           {this.props.item.text}
//         </Button>
//         <Tooltip placement={this.props.item.placement} isOpen={this.state.tooltipOpen} target={'Tooltip-' + this.props.id} toggle={this.toggle}>
//           Tooltip Content!
//         </Tooltip>
//       </span>
//     );
//   }
// }

// class TooltipExampleMulti extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       tooltips: [
//         {
//           placement: 'top',
//           text: 'Top'
//         },
//         {
//           placement: 'bottom',
//           text: 'Bottom'
//         },
//         {
//           placement: 'left',
//           text: 'Left'
//         },
//         {
//           placement: 'right',
//           text: 'Right'
//         }
//       ]
//     };
//   }

//   render() {
//     return (
//       <div>
//         { this.state.tooltips.map((tooltip, i) => {
//           return <TooltipItem key={i} item={tooltip} id={i} />;
//         })}
//       </div>
//     );
//   }
// }





export default ResumeTemplate;
