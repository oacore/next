import React from 'react'
import { Row, Col } from 'reactstrap'
import { Article, Content, Section, Button } from 'components'
import servicesData from 'data/services.yml'

import './services.scss'

const ServicesPage = () => (
  <Article nav>
    <h1>{servicesData.title}</h1>

    {servicesData.sections.map(sections => (
      <Section id={sections.id} caption={sections.title}>
        <h2 id={sections.id} className="text-center">
          {sections.title}
        </h2>

        {sections.sections.map(subsections => (
          <Section
            key={subsections.id}
            id={subsections.id}
            className="service-section"
          >
            <Row className="service-section-title" tag="h3">
              <Col sm="6" md="4" tag="span" className="service-section-logo">
                <img
                  src={subsections.logo}
                  alt={`${subsections.title}'s logo`}
                />
              </Col>

              <Col sm="6" md="8" tag="span">
                {subsections.title}
              </Col>
            </Row>

            <Row className="service-section-content">
              <Col sm="6" md="4">
                <figure>
                  <img
                    className="service-section-screenshot"
                    src={subsections.screenshot}
                    alt={`${subsections.title}'s screenshot`}
                  />
                </figure>
              </Col>

              <Col sm="6" md="8">
                <Content
                  markdown
                  id={subsections.description}
                  key={subsections.description}
                >
                  {subsections.description}
                </Content>

                <footer className="service-section-footer">
                  <Button color="primary" outline href={subsections.action.url}>
                    {subsections.action.caption}
                  </Button>
                </footer>
              </Col>
            </Row>
          </Section>
        ))}
      </Section>
    ))}
  </Article>
)

export default ServicesPage
