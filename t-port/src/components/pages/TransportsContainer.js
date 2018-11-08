import React, { Component } from 'react';
import FilterByType from './presentational/FilterByType';
import Table from './presentational/Table';
import Pagination from './presentational/Pagination';
import Card from './presentational/Card';
import EditingColumnTitles from './presentational/EditingColumnTitles';
import EditTableButton from './presentational/EditTableButton';
import JSONdata from './../../data/data.json';

class TransportsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      transport: JSONdata.transport,
      isEditingMode: true,
      isCardShowen: false,
      addTransportTableItem: this.createAddItemRow(),
      addCardTableItem: this.createAddCardItemRow(),
      isFilteredByBus: false,
      isFilteredByTram: false,
      isFilteredByTroll: false
    }
  }
  render() {
    console.log(this.state.isEditingMode);
    const rows = this.generateTransportTableRow(),
    transportTableTitles = this.transportTableTitles(),
    cardTableTitles = this.cardTableTitles();
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Transport</h2>
                <FilterByType filterByBus={this.filterByBus} filterByTram={this.filterByTram} filterByTroll={this.filterByTroll} isFilteredByBus={this.state.isFilteredByBus} isFilteredByTram={this.state.isFilteredByTram} isFilteredByTroll={this.state.isFilteredByTroll} />
                <Table header = {transportTableTitles} rows = {rows} isAdmin={this.props.isAdmin} addItem={this.state.addTransportTableItem} isEditingMode={this.state.isEditingMode} toggleEditingMode={this.toggleEditingMode}/>
                <Pagination />
                {this.state.isCardShowen ? <Card header = {cardTableTitles} rows = {this.state.cardTableRows} isAdmin={this.props.isAdmin} addItem={this.state.addCardTableItem} isEditingMode={this.state.isEditingMode} toggleEditingMode={this.toggleEditingMode} title={this.state.cardTitle}/>: null}
            </div>
        </main>
    );
  }
  transportTableTitles = () => {
    return (
      <thead>
        <tr>
          <th onClick={() => this.sortBy('type')} >Type</th>
          <th onClick={() => this.sortBy('number')} >Number</th>
          <th onClick={() => this.sortBy('route')} >Route</th>
          <th onClick={() => this.sortBy('seats')} >Seats</th>
          {this.state.isEditingMode ? <EditingColumnTitles /> : null}
        </tr>
      </thead>
    );
  }

  generateTransportTableRow = () => {
    return this.state.transport.map( (rowData) => 
      <tr key={rowData.id}>
        <td><i className="material-icons">{rowData.type}</i></td>
        <td className="table__link" onClick={() => this.showCard(rowData.number, rowData.type)}>{rowData.number}</td>
        <td>{rowData.route}</td>
        <td>{rowData.seats}</td>
        {this.state.isEditingMode ? <>
        <EditTableButton type={'edit'}/>
        <EditTableButton type={'remove'}/></> : null}  
      </tr>
    )
  }

  compareBy = (key) => {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
 
  sortBy = (key) => {
    let arrayCopy = [...this.state.transport];
    arrayCopy.sort(this.compareBy(key));
    this.setState({transport: arrayCopy});
  }

  filterByType = () => {
    let arrayCopy = JSONdata.transport;
    console.log('isFilteredByBus: '+this.state.isFilteredByBus+'\nisFilteredByTroll: '+this.state.isFilteredByTroll+'\nisFilteredByTram: '+this.state.isFilteredByTram);
        if (this.state.isFilteredByBus)
          arrayCopy = arrayCopy.filter(transport => !(transport.type === 'directions_bus'));
        if (this.state.isFilteredByTram)
          arrayCopy =  arrayCopy.filter(transport => !(transport.type === 'tram'));
        if (this.state.isFilteredByTroll) 
          arrayCopy = arrayCopy.filter(transport => !(transport.type === 'train'));
        this.setState({transport: arrayCopy});
        console.log(arrayCopy);
  }

  filterByBus = () => {
    this.setState(prevState => { return {isFilteredByBus: !prevState.isFilteredByBus}});
    this.filterByType();
  }
  filterByTram = () => {
    this.setState(prevState => { return {isFilteredByTram: !prevState.isFilteredByTram}});
    this.filterByType();
  }
  filterByTroll = () => {
    this.setState(prevState => { return {isFilteredByTroll: !prevState.isFilteredByTroll}});
    this.filterByType();
  }

  toggleEditingMode = () => {
    this.setState( prevState => {
      return {
        isEditingMode: !prevState.isEditingMode
      }
    })
  }

  createAddItemRow = () => {
    return(
      <tr>
        <td><input type="text" className="table-edit-input" /></td>
        <td><input type="text" className="table-edit-input" /></td>
        <td><input type="text" className="table-edit-input" /></td>
        <td><input type="text" className="table-edit-input" /></td>
        <td><i className="material-icons table-editor-buttons">add_circle_outline</i></td>
        <td></td>
      </tr>
    )
  }

  createAddCardItemRow = () => {
    return(
      <tr>
        <td><input type="text" className="table-edit-input" /></td>
        <td><input type="text" className="table-edit-input" /></td>
        <td><i className="material-icons table-editor-buttons">add_circle_outline</i></td>
        <td></td>
      </tr>
    )
  }

  showCard = (number, type) => {
      switch(type) {
        case 'directions_bus':
          this.setState({cardTitle: 'Bus ' + number, isCardShowen: true})
          break;
        case 'tram':
          this.setState({cardTitle: 'Tram ' + number, isCardShowen: true})
          break;
        case 'train':
          this.setState({cardTitle: 'Trolleybus ' + number, isCardShowen: true})
          break;
      }
      const TRANSPORTS = JSONdata.transport,
      ROUTES = JSONdata.routes,
      STOPS = JSONdata.stops;
      let schedule, routeNum, stops, stopNames = [], cardTableData = [];
      for (let transport in TRANSPORTS){
        if(Object.entries(TRANSPORTS[transport])[2][1]==number){
          schedule = TRANSPORTS[transport].time;
          routeNum = TRANSPORTS[transport].route;
          for (let route in ROUTES){
            if (Object.entries(ROUTES[route])[0][1]==routeNum){
              stops = ROUTES[route].stops;
            }
          }
        }
      }
      for (let stop in stops){
        for (let STOP in STOPS){
          if (stops[stop] == STOPS[STOP].number)
            stopNames.push(STOPS[STOP].name);
        }
      }
      for (let each in stopNames){
        cardTableData.push({id: each, stopName: stopNames[each], time: schedule[each]});
      }
      console.log(cardTableData);
		  this.setState({ 
        cardTableRows: this.generateTransportCardTableRow(cardTableData)
      });
  }

  generateTransportCardTableRow = (arr) => {
    return arr.map( (rowData) => 
      <tr key={rowData.id}>
        <td>{rowData.stopName}</td>
        <td>{rowData.time}</td>
        {this.state.isEditingMode ? <>
        <EditTableButton type={'edit'}/>
        <EditTableButton type={'remove'}/></> : null}   
      </tr>
    )
  }
  cardTableTitles = () => {
    return (
      <thead>
        <tr>
          <th onClick={() => this.sortBy('stop')} >Stop</th>
          <th onClick={() => this.sortBy('time')} >Time</th>
          {this.state.isEditingMode ? <EditingColumnTitles /> : null}
        </tr>
      </thead>
    );
  }
}

export default TransportsContainer;
