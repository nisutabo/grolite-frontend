import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Table } from 'semantic-ui-react';
import styled from 'styled-components'


class ValuePanel extends Component {
  render (){

    const HeaderLabel = styled.label`
      font-family: Helvetica !important;
      font-size: 14px !important;
      color: grey !important
    `
    const ActivityLabel = styled.label`
      font-family: Helvetica !important;
      font-size: 12px !important;
      color: nlack !important
    `
    let value = this.props.group.expected_harvest_lbs * this.props.crop.market_value
    let percentage_of_total = Math.round((value / parseInt(this.props.total_value, 10)) * 100)
    console.log(value)
    console.log(parseInt(this.props.total_value, 10))
    return (

      <Container>
      <HeaderLabel>VALUE</HeaderLabel>
      <Table celled inverted selectable compact>
          <Table.Body>
            <Table.Row>
              <Table.Cell><ActivityLabel>Quantity: </ActivityLabel></Table.Cell>
              <Table.Cell><ActivityLabel>{this.props.group.trays} Trays </ActivityLabel></Table.Cell>
              <Table.Cell textAlign='left'><ActivityLabel>{this.props.group.expected_harvest_lbs} lbs. (Expected)</ActivityLabel></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><ActivityLabel>Market Value: </ActivityLabel></Table.Cell>
              <Table.Cell><ActivityLabel>USD {value}</ActivityLabel></Table.Cell>
              <Table.Cell textAlign='left'><ActivityLabel>{percentage_of_total} % OF FARM</ActivityLabel></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><ActivityLabel>Value At Risk</ActivityLabel></Table.Cell>
              <Table.Cell><ActivityLabel>-</ActivityLabel></Table.Cell>
              <Table.Cell textAlign='left'><ActivityLabel>-</ActivityLabel></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    data: state.greenhouse.data,
    crop: state.greenhouse.crop,
    group: state.greenhouse.group,
    total_value: state.greenhouse.total_value
   }
}


export default connect(mapStateToProps) (ValuePanel)