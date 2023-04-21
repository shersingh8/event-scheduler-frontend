import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Event } from '../types/Event';

interface Props {
  onSubmit: (event: Event) => void;
}


const EventForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Low');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ id: 0, title, start, end, description, priority });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Start Date and Time</Form.Label>
        <Form.Control
          type="datetime-local"
          value={start.toISOString().slice(0, -8)}
          onChange={(e) => setStart(new Date(e.target.value))}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>End Date and Time</Form.Label>
        <Form.Control
          type="datetime-local"
          value={end.toISOString().slice(0, -8)}
          onChange={(e) => setEnd(new Date(e.target.value))}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
          required
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Form.Control>
      </Form.Group>
      <Button type="submit">Add Event</Button>
    </Form>
  );
};

export default EventForm;
