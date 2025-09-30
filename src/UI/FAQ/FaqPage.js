"use client"

import React from 'react'
import MainFaq from './Sections/MainFaq'
import WorkflowSection from './Sections/Workflow'
import Newsletter from './Sections/Newsletter'

function FaqPage() {
  return (
    <div>
      <MainFaq />
      <WorkflowSection />
      <Newsletter />
    </div>
  )
}

export default FaqPage