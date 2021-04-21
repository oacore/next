import React from 'react'

const LinkCard = ({ link }) => (
  <div>
    <h4>
      <a href={link.href} target="_blank" rel="noreferrer">
        {link.caption}
      </a>
    </h4>
    <p>{link.source}</p>
  </div>
)

const HistoryEvent = ({ event }) => (
  <div>
    <div>
      <img src={event.image.src} alt={event.image.alt} />
    </div>
    <div>
      <time dateTime={event.id}>{event.date}</time>
      <h3>{event.title}</h3>
      <p>{event.body}</p>
      <LinkCard link={event.link} />
    </div>
  </div>
)

const HistoryPage = ({ data }) => (
  <>
    <p>{data?.body}</p>
    {data.events.slice(1).map((event) => (
      <HistoryEvent key={event.fullDate} event={event} />
    ))}
    <p>{data.events[0]?.body}</p>
  </>
)

const getPageData = async () => {
  const data = {}

  return data
}

const getEvents = async () => {
  const events = []

  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
  })

  const processedEvents = events
    .sort((event1, event2) => (event1.date < event2.date ? -1 : 1))
    .map((event) => ({
      ...event,
      fullDate: event.date,
      date: formatter.format(Date.parse(event.date)),
    }))

  return processedEvents
}

export async function getStaticProps() {
  const data = await getPageData()
  const events = await getEvents()

  return {
    props: {
      data: {
        ...data,
        events,
      },
    },
  }
}

export default HistoryPage
