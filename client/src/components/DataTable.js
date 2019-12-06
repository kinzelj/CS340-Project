import React from 'react'
import { Table } from 'semantic-ui-react'

/*******************************************************************
 * Data table dynamically populated based on props:
 * props.data = table row data
 * props.header = table headers
********************************************************************/
const buildRow = (value, index, header) => (
  <Table.Row key={`tr-${index}`}>
    {
      header.map((v, i) =>
        <Table.Cell key={`trc-${i}`}>
          {value[v]}
        </Table.Cell>
      )
    }
  </Table.Row>
);

const populateTable = (props) => {
  if (props.data) {
    return (props.data.map((value, index) => buildRow(value, index, props.header)));
  }
}


const DataTable = (props) => {
  return (
    <div className='table-div'>
      <Table singleLine>
        <Table.Header>
          <Table.Row key={`header-row`}>
            {props.header.map((value, index) => <Table.Cell key={`thc-${index}`}>{value}</Table.Cell>)}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {populateTable(props)}
        </Table.Body>
      </Table>
    </div>
  );
}
export default DataTable