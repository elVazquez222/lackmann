import React, { useEffect, useState } from 'react';
import * as entityService from '../services/entityService';
import * as orderService from '../services/orderService';
import { Entity, Property } from '../types/Entity';
import { Order } from '../types/Order';
import EntityForm from './EntityForm';

interface OrderFormProps {
  onSubmit: (order: Order) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [title, setTitle] = useState('');
  const [position, setPosition] = useState('');
  const [sum, setSum] = useState<number | undefined>();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [selectedEntityId, setSelectedEntityId] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEntityForm, setShowEntityForm] = useState<boolean>(false);

  const handleSubmit = async () => {

    const newOrder: Order = {
      orderNumber,
      title,
      position,
      sum: sum ? sum : 0,
    };

    try {
      const createdOrder = await orderService.createOrder(newOrder);
      onSubmit(createdOrder);
      setOrderNumber('');
      setTitle('');
      setPosition('');
      setSum(undefined);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  useEffect(() => {
    const foundEntity = entities.find((entity) => entity.id === selectedEntityId);
    setSelectedEntity(foundEntity || null);
  }, [selectedEntityId, entities]);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const entities = await entityService.getAllEntities();
        setEntities(entities);
        setSelectedEntityId(entities[0].id);
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };

    fetchEntities();
  }, []);

  const toggleEntityForm = () => {
    setShowEntityForm(!showEntityForm);
  }

  const handleCreateEntity = async (entity: {
    id: number;
    name: string;
    description: string;
    properties: Property[];
  }) => {
    const newEntity = await entityService.createEntity(entity);
    setEntities([...entities, newEntity]);
    setSelectedEntityId(newEntity.id.toString());
    setShowEntityForm(false);
  };

  return (
    <form className="orderForm">
      <h3>Bestellung hinzufügen</h3>
      <div>
        <label htmlFor="entity">Entität:</label>
        <select
          name="entity"
          id="entity"
          value={selectedEntityId}
          onChange={(e) => setSelectedEntityId(e.target.value)}
        >
          {entities.map((entity) => (
            <option key={entity.id} value={entity.id}>
              {entity.name}
            </option>
          ))}
        </select>
        {!showEntityForm && <span className="textButton" onClick={toggleEntityForm}>oder neu hinzufügen</span>}
      </div>

      {showEntityForm && (<EntityForm onSubmit={handleCreateEntity} cancelAddEntity={toggleEntityForm} />)}

      <div>
        <label htmlFor="orderNumber">Bestellnummer:</label>
        <input
          id="orderNumber"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="title">Titel:</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="position">Position:</label>
        <input
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="sum">Summe:</label>
        <input
          id="sum"
          type="number"
          value={sum || ''}
          onChange={(e) => setSum(Number(e.target.value))}
        />
      </div>

      {selectedEntity &&
        selectedEntity.properties &&
        selectedEntity.properties.map((property, index) => (
          <React.Fragment key={index}>
            <div>
              <label>{property.description}:</label>
              {property.dataType === 'string' && <input type="text" />}
              {property.dataType === 'number' && <input type="number" />}
              {property.dataType === 'boolean' && <input type="checkbox" />}
              {property.dataType === 'date' && <input type="date" />}
              {property.dataType === 'dateTime' && <input type="datetime-local" />}
              {property.dataType === 'time' && <input type="time" />}
            </div>
          </React.Fragment>
        ))}
      <span className="formSubmitButton" onClick={handleSubmit}>Hinzufügen</span>
    </form>
  );
}

export default OrderForm;