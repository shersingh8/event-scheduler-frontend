import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import {EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from './EventModal';
import { Button, Modal } from 'react-bootstrap';
import { Event } from '../types/Event';

const API_URL = 'http://localhost:3001';


const Calendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);

const toggleForm = () => setShowModal(!showModal);


  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  const handleDateSelect = (selectInfo: any) => {
    setShowModal(true);
  };

  const handleSubmit = (event: Event) => {
    fetch(`${API_URL}/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents([...events, data]);
        setShowModal(false);
      });
  };

  const handleEventDrop = (eventDropInfo: any) => {
    const updatedEvent: Event = {
      ...eventDropInfo.event.extendedProps,
      start: eventDropInfo.event.start,
      end: eventDropInfo.event.end,
    };
    fetch(`${API_URL}/events/${updatedEvent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        const index = events.findIndex((event) => event.id === data.id);
        const newEvents = [...events];
        newEvents.splice(index, 1, data);
        setEvents(newEvents);
      });
  };

  const handleModalHide = () => setShowModal(false);

  const eventToInput = (event: Event): EventInput => ({
    id: event.id.toString(),
    title: event.title,
    start: event.start.toISOString(),
    end: event.end.toISOString(),
    description: event.description,
    backgroundColor:
      event.priority === 'High'
        ? '#28a745'
        : event.priority === 'Medium'
        ? '#ffc107'
        : '#007bff',
  });

  return (
    <>
      <EventModal show={showModal} onHide={handleModalHide} onSubmit={handleSubmit} />
      
<Button variant="primary" onClick={toggleForm}>
  Add Event
</Button>

      <br />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events.map(eventToInput)}
        dateClick={handleDateSelect}
        eventDrop={handleEventDrop}
      />
    </>
  );
};

export default Calendar;
