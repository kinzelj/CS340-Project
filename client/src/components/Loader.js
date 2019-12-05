import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const LoaderSpin = () => (
  <div style={{marginTop: '50px'}}>
        <Loader active inline='centered' invertead size='large'>Loading</Loader>
  </div>
)

export default LoaderSpin