import React from 'react'
import { Loader } from 'semantic-ui-react'

/*******************************************************************
 * Loading spinner that will be rendered anytime waiting on data
 * from server before table is populated
********************************************************************/
const LoaderSpin = () => (
  <div style={{marginTop: '50px'}}>
        <Loader active inline='centered' invertead="true" size='large'>Loading</Loader>
  </div>
)

export default LoaderSpin