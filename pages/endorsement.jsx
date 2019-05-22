import React from 'react'
import { Badge, Button, Input, Form, FormGroup, Label } from 'reactstrap'
import { Page, Testimonial } from 'components'
import endorsementData from 'data/endorsements.yml'

const EndorsementPage = () => (
  <Page
    title={endorsementData.title}
    description={endorsementData.description}
    keywords={endorsementData.keywords}
    className="service-page"
    nav
  >
    <h1>{endorsementData.title}</h1>
    <Form inline className="justify-content-center mx-m-5 mb-3">
      <FormGroup>
        <Label for="endorsementCustomSelect">Filter by: &nbsp;</Label>
        <Input
          type="select"
          id="endorsementCustomSelect"
          name="endorsementCustomSelect"
        >
          <option value="">Select</option>
          <option>all</option>
          <option>academic institutions</option>
          <option>partners</option>
          <option>companies</option>
          <option>other</option>
        </Input>
      </FormGroup>
    </Form>

    <div className="justify-content-center mx-5 mb-3">
      <span>(or) Filter by: </span>
      <Button outline color="primary" className="m-1">
        all
      </Button>
      <Button outline color="primary" className="m-1">
        academic institutions
      </Button>
      <Button outline color="primary" className="m-1">
        partners
      </Button>
      <Button outline color="primary" className="m-1">
        info
      </Button>
      <Button outline color="primary" className="m-1">
        companies
      </Button>
      <Button outline color="primary" className="m-1">
        other
      </Button>
    </div>

    {endorsementData.testimonials.map(testimonial => (
      <div className="m-md-5">
        <Testimonial key={testimonial.title} {...testimonial} />
        <span>Tag: </span>
        <Badge olor="primary" className="m-1" pill>
          {testimonial.author.tag}
        </Badge>
        (or)
        <Badge color="primary" className="m-1">
          {testimonial.author.tag}
        </Badge>
        (or)
        <Badge color="secondary" className="m-1">
          {testimonial.author.tag}
        </Badge>
      </div>
    ))}
  </Page>
)

export default EndorsementPage
