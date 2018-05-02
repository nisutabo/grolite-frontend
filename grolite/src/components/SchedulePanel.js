import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Container, Form, Checkbox, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const HeaderLabel = styled.label`
  font-family: Helvetica !important;
  font-size: 20px !important;
  color: grey !important
`

const ColumnLabel = styled.label`
  font-family: Helvetica !important;
  font-size: 14px !important;
`

const RowLabel = styled.label`
  font-family: Helvetica-Light !important;
  font-size: 12px !important;
  color: black !important
`


class SchedulePanel extends Component {

  state = {
    sortBy: 'MONTH',
    sortColumnByDate: false
  }

  handleChange = (e, { value }) => this.setState({ sortBy: value })

  handleDateClick = () => this.setState({
    sortColumnByDate: true
  })

  handleIDClick = () => this.setState({
    sortColumnByDate: false
  })

  sortPeriod = () => this.state.sortBy === 'WEEK' ? 7 : 30

  sortGroups = () => {

    let today = new Date ();
    let monthFromToday = new Date (today.getTime() + (86400000 * this.sortPeriod()));
    let results = [[],[],[]];

    this.props.groups.forEach(group => {
      if ( new Date(group.propagation_date) > today && new Date(group.propagation_date) < monthFromToday){
        results[0].push(group)
      } else if (new Date(group.production_date) > today && new Date(group.production_date) < monthFromToday) {
        results[1].push(group)
      } else if (new Date(group.harvest_date) > today && new Date(group.harvest_date) < monthFromToday) {
        results[2].push(group)
    }
  })
  return results
  }

  tableGroups = () => {

    const forPropagation = (<Table.Row textAlign='left'><Table.Cell><ColumnLabel>TRANSFERS TO PROPAGATION:</ColumnLabel></Table.Cell></Table.Row>)

    const propagationHeader = (<Table.Row textAlign='left'><Table.Cell><ColumnLabel>GROUP ID<Icon onClick={this.handleIDClick} name='angle down'/></ColumnLabel></Table.Cell><Table.Cell ><ColumnLabel>PROPAGATION DATE <Icon onClick={this.handleDateClick} name='angle down'/></ColumnLabel></Table.Cell><Table.Cell ><ColumnLabel>CROP</ColumnLabel></Table.Cell></Table.Row>)

    const propagationGroups = () => this.sortGroups()[0].length > 0 ?
    this.state.sortColumnByDate === true ?
    this.sortGroups()[0].sort((a,b) => {
      let c = new Date(a.propagation_date)
      let d = new Date(b.propagation_date)
      return c - d
    }).map(group => {
        return <Table.Row key={group.id}><Table.Cell><RowLabel>{group.id} - {group.seed_date.split('T')[0]}</RowLabel></Table.Cell><Table.Cell><RowLabel>{group.propagation_date.split('T')[0]}</RowLabel></Table.Cell><Table.Cell><RowLabel>{group.crop_name}</RowLabel></Table.Cell></Table.Row>
    })
    :
    this.sortGroups()[0].map(group => {
        return <Table.Row key={group.id}><Table.Cell><RowLabel>{group.id} - {group.seed_date.split('T')[0]}</RowLabel></Table.Cell><Table.Cell><RowLabel>{group.propagation_date.split('T')[0]}</RowLabel></Table.Cell><Table.Cell><RowLabel>{group.crop_name}</RowLabel></Table.Cell></Table.Row>
    })
    :
    <Table.Row><Table.Cell><RowLabel> - </RowLabel></Table.Cell><Table.Cell><RowLabel> - </RowLabel></Table.Cell><Table.Cell><RowLabel> - </RowLabel></Table.Cell></Table.Row>


    const forProduction = (<Table.Row textAlign='left'><Table.Cell><ColumnLabel>TRANSFERS TO PRODUCTION:</ColumnLabel></Table.Cell></Table.Row>)

    const productionHeader = (<Table.Row textAlign='left'><Table.Cell><ColumnLabel>GROUP ID</ColumnLabel></Table.Cell><Table.Cell ><ColumnLabel>PRODUCTION DATE</ColumnLabel></Table.Cell><Table.Cell ><ColumnLabel>CROP</ColumnLabel></Table.Cell></Table.Row>)

    const productionGroups = () => this.sortGroups()[1].length > 0 ?
    this.state.sortColumnByDate === true ?
    this.sortGroups()[1].sort((a,b) => {
      let c = new Date(a.production_date)
      let d = new Date(b.production_date)
      return c - d
    }).map(group => {
        return <Table.Row key={group.id}><Table.Cell><RowLabel>{group.id} - {group.seed_date.split('T')[0]}</RowLabel></Table.Cell><Table.Cell><RowLabel>{group.production_date.split('T')[0]}</RowLabel></Table.Cell><Table.Cell><RowLabel>{group.crop_name}</RowLabel></Table.Cell></Table.Row>
    })
    :
    this.sortGroups()[1].map(group => {
        return <Table.Row key={group.id}><Table.Cell><RowLabel>{group.id} - {group.seed_date.split('T')[0]}</RowLabel></Table.Cell><Table.Cell><RowLabel>{group.production_date.split('T')[0]}</RowLabel></Table.Cell><Table.Cell><RowLabel>{group.crop_name}</RowLabel></Table.Cell></Table.Row>
    })
    :
    <Table.Row><Table.Cell><RowLabel> - </RowLabel></Table.Cell><Table.Cell><RowLabel> - </RowLabel></Table.Cell><Table.Cell><RowLabel> - </RowLabel></Table.Cell></Table.Row>


    const forHarvest = (<Table.Row textAlign='left'><Table.Cell><ColumnLabel>DUE FOR HARVEST:</ColumnLabel></Table.Cell></Table.Row>)

    const harvestHeader = (<Table.Row textAlign='left'><Table.Cell><ColumnLabel>GROUP ID</ColumnLabel></Table.Cell><Table.Cell ><ColumnLabel>HARVEST DATE</ColumnLabel></Table.Cell><Table.Cell ><ColumnLabel>CROP</ColumnLabel></Table.Cell></Table.Row>)

    const harvestGroups = () => this.sortGroups()[2].length > 0 ?
    this.state.sortColumnByDate === true ?
    this.sortGroups()[2].sort((a,b) => {
      let c = new Date(a.harvest_date)
      let d = new Date(b.harvest_date)
      return c - d
    }).map(group => {
        return <Table.Row key={group.id}><Table.Cell><RowLabel>{group.id} - {group.seed_date.split('T')[0]}</RowLabel></Table.Cell><Table.Cell><RowLabel>{group.harvest_date.split('T')[0]}</RowLabel></Table.Cell><Table.Cell><RowLabel>{group.crop_name}</RowLabel></Table.Cell></Table.Row>
    })
    :
    this.sortGroups()[2].map(group => {
        return <Table.Row key={group.id}><Table.Cell><RowLabel>{group.id} - {group.seed_date.split('T')[0]}</RowLabel></Table.Cell><Table.Cell><RowLabel>{group.harvest_date.split('T')[0]}</RowLabel></Table.Cell><Table.Cell><RowLabel>{group.crop_name}</RowLabel></Table.Cell></Table.Row>
    })
    :
    <Table.Row><Table.Cell><RowLabel> - </RowLabel></Table.Cell><Table.Cell><RowLabel> - </RowLabel></Table.Cell><Table.Cell><RowLabel> - </RowLabel></Table.Cell></Table.Row>


    return (
            <Container>
              <Table >
                <Table.Body>
                  {forPropagation}
                  {propagationHeader}
                  {propagationGroups()}
                </Table.Body>
                <Table.Body>
                  {forProduction}
                  {productionHeader}
                  {productionGroups()}
                </Table.Body>
                <Table.Body>
                  {forHarvest}
                  {harvestHeader}
                  {harvestGroups()}
                </Table.Body>
              </Table>
            </Container>
              )
  }

  render(){
    return (
      <Container>
      <HeaderLabel>ACTIVITY</HeaderLabel>
      <br></br>
      <br></br>
      <Form>
          <Form.Group inline>
          <Form.Field>
            <Checkbox
              radio
              label='THIS WEEK'
              value='WEEK'
              checked={this.state.value === 'WEEK'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label='THIS MONTH'
              value='MONTH'
              checked={this.state.value === 'MONTH'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      {this.tableGroups()}
      </Container>
    )
  }
}


const mapStateToProps = (state) => {

  return {
          crops: state.greenhouse.crops,
          groups: state.greenhouse.groups
        }
}



export default connect(mapStateToProps)(SchedulePanel)
