import React from 'react'

import { FAQ } from '../../FAQ'
import { DownwardModal } from '../../components/DownwardModal'

const FaqModal = () => {
  return (
    <div className="faqModal card tight">
      <DownwardModal heading={'FAQ'}>
        <FAQ />
      </DownwardModal>
    </div>
  )
}

export {
  FaqModal
}
