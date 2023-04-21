import { Modal, Button } from 'react-bootstrap';
import EventForm from './EventForm';
import { Event } from '../types/Event';

interface Props {
  show: boolean;
  onHide: () => void;
  onSubmit: (event: Event) => void;
}


const EventModal = ({ show, onHide, onSubmit }: Props) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EventForm onSubmit={onSubmit} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
